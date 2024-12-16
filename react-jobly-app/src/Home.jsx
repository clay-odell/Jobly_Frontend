import { useUser } from "./UserContext";
import Card from "react-bootstrap/Card";

const Home = () => {
  const { currentUser } = useUser();
  return (
    <>
      <h1>Welcome to Jobly</h1>
      <Card style={{ margin: "auto" }}>
        <Card.Title>All the Jobs in One Place</Card.Title>
        <Card.Body>
          {currentUser ? (
            <p>Welcome Back, {currentUser.username}</p>
          ) : (
            <p>Welcome, Guest, please login for best experience.</p>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Home;
