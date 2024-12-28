import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { useUser } from "./UserContext";
import JoblyApi from "../../api";
import useLocalStorage from "./useLocalStorageHook";

const ApplyButton = ({ jobId }) => {
  const { currentUser, token } = useUser();
  const [hasApplied, setHasApplied] = useLocalStorage(
    `hasApplied-${jobId}`,
    null
  );

  // Check if the current user has applied for the job
  const checkIfApplied = useCallback(async () => {
    if (!token || !currentUser) {
      return; 
    }

    try {
      JoblyApi.token = token; // Ensure the token is set
      const response = await JoblyApi.getUser(currentUser.username);

      if (response?.user?.applications) {
        const appliedJobIds = response.user.applications;
        setHasApplied(appliedJobIds.includes(jobId));
      } else {
        setHasApplied(false);
      }
    } catch (error) {
      console.error("There was an error fetching applied jobs", error);
      setHasApplied(false);
    }
  }, [currentUser, jobId, token, setHasApplied]);

  useEffect(() => {
    checkIfApplied();
  }, [checkIfApplied]);

  // Handle applying to a job
  const handleApply = async () => {
    try {
      JoblyApi.token = token; // Ensure the token is set
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setHasApplied(true);
      console.log("Job application successful");
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
