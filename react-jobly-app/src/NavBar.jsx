import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from './UserContext';

const NavBar = () => {
    const {currentUser} = useUser();
    return (
        <Navbar bg="success" expand="md" className='bg-body-tertiary' fixed='top'>
            <Container>
                <Navbar.Brand href='/'>Jobly</Navbar.Brand>
                <Nav className='me-auto'>
                    {!currentUser ? (
                        <>
                            <Nav.Link href='/login'>Login</Nav.Link>
                            <Nav.Link href='/signup'>Sign Up</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href='/profile'>{currentUser.username}</Nav.Link> 
                            <Nav.Link href='/jobs'>Jobs List</Nav.Link>
                            <Nav.Link href='/companies'>Companies List</Nav.Link>
                            <Nav.Link href='/companies/foster-rice'>Foster-Rice</Nav.Link>
                            <Nav.Link href='/logout'>Log Out</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
