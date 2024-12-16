import Card from "react-bootstrap/Card";
import ApplyButton from "./ApplyButton";

const CardTemplate = ({ type, data, onClick, currencyFormatter }) => {
  const renderCardContent = () => {
    if (!data) {
      return <Card.Text>Loading...</Card.Text>;
    }


    switch (type) {
      case "job":
        return (
          <>
            <Card.Title>
              <strong>{data.title}</strong>
            </Card.Title>
            <Card.Text>{data.companyHandle}</Card.Text>
            <Card.Text>
              {data.salary === "" || data.salary === null
                ? "No salary information available."
                : `Salary: ${currencyFormatter(data.salary)}`}
            </Card.Text>
            <Card.Text>
              <strong>
                {data.equity === null || data.equity === "0"
                  ? "No equity stake"
                  : `Equity Stake: ${data.equity}%`}
              </strong>
            </Card.Text>
            <ApplyButton jobId={data.id} />
          </>
        );
      case "company":
        return (
          <>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>{data.handle}</Card.Text>
            <Card.Text>{data.description}</Card.Text>
          </>
        );
      case "user":
        return (
          <>
            <Card.Title>{data.username}'s Profile:</Card.Title>
            <Card.Text>Email: {data.email}</Card.Text>
          </>
        );
      default:
        return <Card.Text>Invalid Card Type</Card.Text>;
    }
  };

  return (
    <Card style={{ width: "850px" }} onClick={onClick}>
      <Card.Body>{renderCardContent()}</Card.Body>
    </Card>
  );
};

export default CardTemplate;
