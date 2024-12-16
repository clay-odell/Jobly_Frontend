import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../../api";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();

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
      const newUser = await JoblyApi.registerUser(formData);
      setUser(newUser);
      setToken(newUser.token);
      navigate("/");
    } catch (error) {
      console.error("There was an error registering your account.", error);
    }
  };

  return (
    <>
      <h1>Sign Up for a Jobly Account:</h1>
      <Container style={{ width: "18rem" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Username: <br />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>Password: <br />
          <input type="password"
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 />
          </label>
          <br />
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
          <Button type="submit" variant="primary" style={{marginTop : '10px'}}>
            Register
          </Button>
        </form>
      </Container>
    </>
  );
};
export default RegisterUser;
