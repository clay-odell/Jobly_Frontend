import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import JoblyApi from "../../api";
import CardTemplate from "./CardTemplate";
import JobSearchBar from "./JobSearchBar";
import { useUser } from "./UserContext"; 
import ApplyButton from "./ApplyButton";

const JobList = () => {
  const { token } = useUser();  // Get the token from the context
  const [jobs, setJobs] = useState(null);
  const navigate = useNavigate();

  const getJobs = useCallback(async () => {
    try {
      const jobsData = await JoblyApi.getJobs();
      setJobs(jobsData.jobs);
    } catch (error) {
      console.error("Something went wrong with fetching that data", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getJobs();
    }
  }, [token, getJobs]);

  const handleClick = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  //Helper function to format salary number into currency.
  const currencyFormatter = (number) => {
    const formattedNumber = new Intl.NumberFormat().format(number);
    return `$${formattedNumber}`;
  };

  return (
    <div style={{ width: "850px", marginTop: "12rem" }}>
      <h1>Jobs List</h1>
      <JobSearchBar setJobs={setJobs} />
      {jobs ? (
        jobs.map((job) => (
          <CardTemplate key={job.id} data={job} type="job" onClick={() => handleClick(job)} currencyFormatter={currencyFormatter}>
            <ApplyButton jobId={job.id} /> 
          </CardTemplate>
        ))
      ) : (
        <p>Loading jobs...</p>
      )}
    </div>
  );
};

export default JobList;
