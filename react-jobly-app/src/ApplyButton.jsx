import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useUser } from "./UserContext";
import JoblyApi from "../../api";
import useLocalStorage from "./useLocalStorageHook";

const ApplyButton = ({ jobId }) => {
  const { currentUser, token } = useUser();
  const [hasApplied, setHasApplied] = useLocalStorage(`hasApplied-${jobId}`, null);

  useEffect(() => {
    const checkIfApplied = async () => {
      if (!token || !currentUser) return; // Ensure the token and currentUser are present

      try {
        const response = await JoblyApi.getUser(currentUser.username);

        if (response?.user?.applications) {
          const appliedJobIds = response.user.applications;
          const hasAppliedStatus = appliedJobIds.includes(jobId);
          if (hasApplied !== hasAppliedStatus) {
            setHasApplied(hasAppliedStatus);
          }
        } else {
          if (hasApplied !== false) {
            setHasApplied(false);
          }
        }
      } catch (error) {
        console.error("There was an error fetching applied jobs", error);
        setHasApplied(false);
      }
    };

    if (hasApplied === null) {
      checkIfApplied(); // Only check if hasApplied is null
    }
  }, [currentUser, jobId, token, hasApplied]);

  const handleApply = async () => {
    if (hasApplied) return; // Prevent multiple applications

    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setHasApplied(true);
    } catch (error) {
      console.error("There was an error applying for this job", error);
    }
  };

  if (hasApplied === null) {
    return (
      <Button variant="primary">
        Apply
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
