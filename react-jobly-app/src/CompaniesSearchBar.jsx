import React, { useState } from "react";
import JoblyApi from "../../api";
import Button from "react-bootstrap/Button";
import NoResAlert from "./NoResultAlert";

const CompaniesSearchBar = ({ setCompanies }) => {
  const [search, setSearch] = useState({
    name: "",
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const resp = await JoblyApi.searchCompanies(search);
      if (!resp.companies || resp.companies.length === 0) {
        setShow(true);
        setCompanies([]);
      } else {
        setShow(false);
        setCompanies(resp.companies);
      }
      
    } catch (err) {
      console.error("There was an error fetching your search", err);
      setShow(true);
    }
  };

  const refreshCompanies = async(e) => {
    try {
      const resp = await JoblyApi.getCompanies();
      setCompanies(resp.companies);
    } catch (error) {
      console.error("There was an error refreshing companies list", error);
    }
  };

  return (
    <>
      <input
        type="text"
        name="name"
        value={search.name}
        onChange={handleChange}
        required
      />
      <Button variant="primary" type="submit" onClick={handleClick}>
        Search
      </Button>
      <NoResAlert show={show} setShow={setShow} refreshCompanies={refreshCompanies} type='companies'/>
    </>
  );
};
export default CompaniesSearchBar;

