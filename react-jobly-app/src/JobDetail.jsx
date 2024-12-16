import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import JoblyApi from "../../api";
import Button from "react-bootstrap/Button";
import ApplyButton from "./ApplyButton";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/jobs");
  };

  useEffect(() => {
    const getClickedJob = async () => {
      try {
        const clickedJob = await JoblyApi.getJob(id);
        setJob(clickedJob);
      } catch (error) {
        console.error("Something went wrong fetching that data", error);
      }
    };
    getClickedJob();
  }, [id]);

    //Helper function to format salary number into currency.
    const currencyFormatter = (number) => {
        const formattedNumber = new Intl.NumberFormat().format(number);
        return `$${formattedNumber}`;
      };

  return (
    <>
      {job ? (
        <>
          <h1>Job Listing:</h1>
          <Container style={{ width: "850px" }}>
            <Card>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <div>
                  <p>
                    <strong>Company: </strong>
                    {job.company?.name}
                  </p>
                  <p><strong>
                    {job.salary === "null" || job.salary === ""
                      ? "Salary information unavailable"
                      : `Salary: ${currencyFormatter(job.salary)}`}
                      </strong>
                  </p>
                  <p>
                    <strong>Number of Employees: </strong>
                    {job.company?.numEmployees ?? "Information not available."}
                  </p>
                  <p>
                    <strong>Equity Stake: </strong>
                    {job.equity === null || job.equity === 0
                      ? "No equity stake"
                      : job.equity}
                  </p>
                </div>
              </Card.Body>
              <ApplyButton jobId={job.id} />
              <Button variant="danger" onClick={handleClick}>
                Close
              </Button>
            </Card>
          </Container>
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </>
  );
};

export default JobDetail;
