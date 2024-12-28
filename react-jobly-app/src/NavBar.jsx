import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useUser } from './UserContext';

const NavBar = () => {
  const { currentUser } = useUser();
  return (
    <Navbar bg="success" expand="md" className='bg-body-tertiary' fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to="/">Jobly</Navbar.Brand>
        <Nav className='me-auto'>
          {!currentUser ? (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/profile">{currentUser.username}</Nav.Link>
              <Nav.Link as={Link} to="/jobs">Jobs List</Nav.Link>
              <Nav.Link as={Link} to="/companies">Companies List</Nav.Link>
              <Nav.Link as={Link} to="/companies/foster-rice">Foster-Rice</Nav.Link>
              <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
