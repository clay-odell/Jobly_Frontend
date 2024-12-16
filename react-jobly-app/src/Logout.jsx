import { useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const Logout = ({logout}) => {
    const navigate = useNavigate();

    const handleClick = () =>{
        logout();
        navigate("/");
    }
    return (
        <>
            <Container style={{width: '18rem'}}>
                <h3>Are you sure you want to logout?</h3>
                <Button variant='danger' onClick={handleClick}>Log Out</Button>
            </Container>
        </>
    );
};
export default Logout;