import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import JoblyApi from "../../api";
import { useUser } from "./UserContext";  

const Profile = () => {
  const { currentUser, setCurrentUser } = useUser();

  const [formData, setFormData] = useState({
    firstName: currentUser ? currentUser.firstName : "",
    lastName: currentUser ? currentUser.lastName : "",
    email: currentUser ? currentUser.email : ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await JoblyApi.updateUser(currentUser.username, formData);
      setCurrentUser(updatedUser);
      alert(`Updated ${updatedUser.username}`);
      navigate("/")
    } catch (error) {
      console.error(
        "There was an error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (!currentUser) return <p>Please log in to edit your profile.</p>;

  return (
    <Container style={{ width: "25rem" }}>
      <h1>Edit Profile</h1>
      <h2>{currentUser.username}'s Information:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name: <br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name: <br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email: <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <Button variant="info" type="submit">
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
