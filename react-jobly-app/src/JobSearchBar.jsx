import React, { useState } from "react";
import JoblyApi from "../../api";
import Button from "react-bootstrap/Button";
import NoResAlert from "./NoResultAlert";

const JobSearchBar = ({ setJobs }) => {
  const [search, setSearch] = useState({
    title: "",
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const refreshJobs =  async () => {
    try {
        const res = await JoblyApi.getJobs();
        setJobs(res.jobs);
    } catch (error) {
        console.error('There was an error refreshing jobs', error);
    }
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (search.title === "") {
        const res = await JoblyApi.getJobs();
        setJobs(res.jobs || []); 
        setShow(false); 
      } else {
        const res = await JoblyApi.searchJobs(search);
        if (!res || res.jobs.length === 0) {
          setShow(true); 
          setJobs([]); 
        } else {
          setShow(false);
          setJobs(res.jobs);
        }
      }
    } catch (err) {
      console.error(
        `There was an error fetching ${search.title || "jobs"} from the database`,
        err
      );
    }
  };

  return (
    <>
      <input
        type="text"
        name="title"
        value={search.title}
        onChange={handleChange}
        required
      />
      <Button variant="primary" type="submit" onClick={handleClick}>
        Search
      </Button>
      <NoResAlert show={show} setShow={setShow} refreshJobs={refreshJobs} type='jobs' />
    </>
  );
};

export default JobSearchBar;
