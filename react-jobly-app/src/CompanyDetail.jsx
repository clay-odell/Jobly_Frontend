import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import JoblyApi from "../../api";
import ApplyButton from "./ApplyButton";  // Ensure the correct path

const CompanyDetail = () => {
  const { handle } = useParams(); // Access the handle parameter from the URL
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/companies");
  };

  useEffect(() => {
    const getCompany = async () => {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (error) {
        console.error(`There was an error fetching company for handle: ${handle}`, error);
      }
    };
    getCompany();
  }, [handle]);

    //Helper function to format salary number into currency.
    const currencyFormatter = (number) => {
      const formattedNumber = new Intl.NumberFormat().format(number);
      return `$${formattedNumber}`;
    };

    //Helper function to format equity stake into percentage
    const transformToPercentage = (number) => {
      const transformedPercentage = number * 100;
      return `${transformedPercentage}%`;
    }

  return (
    <>
      {company ? (
        <>
          
          <Container style={{ width: "850px"}}>
          <h1 style={{marginTop: '5rem'}}>{company.name}</h1>
            {company.jobs && company.jobs.map(job => (
              <Card key={job.id} style={{ marginBottom: "1rem" }}>
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>
                  {job.salary === null || job.salary === 0 ? "Salary information unavailable.": `Salary: ${currencyFormatter(job.salary)}`}
                  </Card.Text>
                  <Card.Text>
                    {job.equity === '0' || job.equity === 'null'? "No equity stake offered." : `Equity Stake: ${transformToPercentage(job.equity)}`}
                  </Card.Text>
                  <ApplyButton jobId={job.id} />
                </Card.Body>
              </Card>
            ))}
            <Button variant="primary" onClick={handleClick}>Close</Button>
          </Container>
        </>
      ) : (
        <p>Loading company details...</p>
      )}
    </>
  );
};

export default CompanyDetail;
