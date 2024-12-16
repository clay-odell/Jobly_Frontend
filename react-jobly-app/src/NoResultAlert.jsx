import Alert from "react-bootstrap/Alert";

const NoResAlert = ({ show, setShow, refreshJobs, refreshCompanies, type }) => {
  const handleClose = () => {
    setShow(false);
    if (type === 'jobs') {
      refreshJobs();
    } else if (type === 'companies') {
      refreshCompanies();
    }
  };

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={handleClose} dismissible>
          <Alert.Heading>
            Uh Oh! There were no matches for your search.
          </Alert.Heading>
          <p>Please try a different search.</p>
        </Alert>
      )}
    </>
  );
};

export default NoResAlert;
