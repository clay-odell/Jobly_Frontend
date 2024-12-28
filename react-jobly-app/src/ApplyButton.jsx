import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { useUser } from "./UserContext";
import JoblyApi from "../../api";
import useLocalStorage from "./useLocalStorageHook";

const ApplyButton = ({ jobId }) => {
  const { currentUser, token } = useUser();
  const [hasApplied, setHasApplied] = useLocalStorage(`hasApplied-${jobId}`, null);

  const checkIfApplied = useCallback(async () => {
    if (!token || !currentUser) {
      console.log("Token or currentUser is missing");
      return;
    }

    try {

      if (response && response.user && response.user.applications) {
        const appliedJobIds = response.user.applications;
        const hasAppliedStatus = appliedJobIds.includes(jobId);
        if (hasApplied !== hasAppliedStatus) {
          setHasApplied(hasAppliedStatus);
          console.log("Has applied:", hasAppliedStatus);
        }
      } else {
        if (hasApplied !== false) {
          setHasApplied(false);
          console.log("User has no applications or data structure is different");
        }
      }
    } catch (error) {
      console.error("There was an error fetching applied jobs", error);
      if (hasApplied !== false) {
        setHasApplied(false);
      }
    }
  }, [currentUser, jobId, token, hasApplied]);

  useEffect(() => {
    checkIfApplied();
  }, [checkIfApplied]);

  const handleApply = useCallback(async () => {
    try {
      
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setHasApplied(true);
      console.log("Job application successful");
    } catch (error) {
      console.error("There was an error applying for this job", error);
    }
  }, [token, currentUser, jobId]);

  if (hasApplied === null) {
    console.log("Checking application status...");
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
