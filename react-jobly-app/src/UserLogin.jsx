import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const UserLogin = ({ login }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      await login(formData); 
      navigate("/"); // 
    } catch (error) {
      console.error("There was an error logging in.", error);
    }
  };

  return (
    <Container>
      <h1>Login:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <br />
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password: <br />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <Button type='submit' variant='primary'>Login</Button>
      </form>
    </Container>
  );
};

export default UserLogin;
