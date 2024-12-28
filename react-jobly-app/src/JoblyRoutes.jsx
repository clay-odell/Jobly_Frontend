import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import UserLogin from "./UserLogin";
import RegisterUser from "./RegisterUser";
import Logout from "./Logout";
import CompaniesList from "./CompaniesList";
import JobList from "./JobList";
import Profile from "./Profile";
import CompanyDetail from "./CompanyDetail";
import JobDetail from "./JobDetail";
import ProtectedRoute from "./ProtectedRoute"; // Ensure correct import path

const JoblyRoutes = ({ signup, login, logout }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin login={login} />} />
      <Route path="/signup" element={<RegisterUser signup={signup} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logout" element={<Logout logout={logout} />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default JoblyRoutes;
