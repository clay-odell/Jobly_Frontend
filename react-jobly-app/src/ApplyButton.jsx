import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useUser } from "./UserContext";
import JoblyApi from "../../api";
import useLocalStorage from "./useLocalStorageHook";

const ApplyButton = ({ jobId }) => {
  const { currentUser, token } = useUser();
  const [hasApplied, setHasApplied] = useLocalStorage(`hasApplied-${jobId}`, null);
  const prevHasAppliedRef = useRef(null); // Use useRef to track the previous hasApplied state

  useEffect(() => {
    const checkIfApplied = async () => {
      if (!token || !currentUser) return; // Ensure the token and currentUser are present

      try {
        const response = await JoblyApi.getUser(currentUser.username);

        if (response?.user?.applications) {
          const appliedJobIds = response.user.applications;
          const hasAppliedStatus = appliedJobIds.includes(jobId);
          // Check if we need to update the state
          if (prevHasAppliedRef.current !== hasAppliedStatus) {
            setHasApplied(hasAppliedStatus);
            prevHasAppliedRef.current = hasAppliedStatus; // Update the ref to the current state
          }
        } else {
          if (prevHasAppliedRef.current !== false) {
            setHasApplied(false);
            prevHasAppliedRef.current = false; // Update the ref to the current state
          }
        }
      } catch (error) {
        console.error("There was an error fetching applied jobs", error);
        setHasApplied(false);
        prevHasAppliedRef.current = false; // Update the ref to the current state
      }
    };

    checkIfApplied();
  }, [currentUser, jobId, token]);

  const handleApply = async () => {
    if (hasApplied) return; // Prevent multiple applications

    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setHasApplied(true);
      prevHasAppliedRef.current = true; // Update the ref to the current state
    } catch (error) {
      console.error("There was an error applying for this job", error);
    }
  };

  if (hasApplied === null) {
    return (
      <Button variant="primary" disabled>
        Loading...
      </Button>
    );
  }

  return (
    <Button onClick={handleApply} variant="primary" disabled={hasApplied}>
      {hasApplied ? "Applied" : "Apply"}
    </Button>
  );
};

export default ApplyButton;
