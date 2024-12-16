import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import JoblyApi from "../../api";
import CardTemplate from "./CardTemplate";
import CompaniesSearchBar from "./CompaniesSearchBar";
import { useNavigate } from "react-router-dom";

const CompaniesList = ({token}) => {
    const [companies, setCompanies] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCompanies = async () => {
            try {
                JoblyApi.token = token;
                const companiesData = await JoblyApi.getCompanies();
                setCompanies(companiesData.companies);
            } catch (error) {
                console.error("Something went wrong fetching data", error);
            }
        };
        getCompanies();
    }, [token]);

    const handleClick = (company) => {
        navigate(`/companies/${company.handle}`);
    };

    return (
        <Container style={{ width: '850px', marginTop: '12rem' }}>
            <h2>Company List</h2>
            <CompaniesSearchBar setCompanies={setCompanies} />
            {companies ? (
                companies.map((company) => (
                    <CardTemplate 
                        key={company.id || company.name} 
                        data={company} 
                        type="company" 
                        onClick={() => handleClick(company)} 
                    />
                ))
            ) : (
                <p>Loading companies...</p>
            )}
        </Container>
    );
};

export default CompaniesList;
