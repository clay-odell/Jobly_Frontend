import { useEffect, useState} from "react";
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router } from "react-router-dom";  
import JoblyRoutes from "./JoblyRoutes";
import NavBar from "./NavBar";
import "./App.css";
import JoblyApi from "../../api"; 
import { useUser } from "./UserContext";
import useLocalStorage from "./useLocalStorageHook";

function App() {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const [token, setToken] = useLocalStorage("token", null);
  const {setCurrentUser: setContextUser, setToken: setContextToken} = useUser();
  
  //Syncs context and localStorage for user
  useEffect(() => {
    setContextUser(currentUser);
  }, [currentUser, setContextUser]);

  //Syncs contexts and localStorage for token
  useEffect(() => {
    setContextToken(token);
  }, [token, setContextToken]);

  // Fetches user data on token change
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = jwtDecode(token);
          const response = await JoblyApi.getUser(username);
          setCurrentUser(response.user);
        } catch (error) {
          console.error("There was an error fetching user information", error);
          setCurrentUser(null);
        }
      }
    };
    fetchUserInfo();
  }, [token]);

  const login = async (data) => {
    try {
      const {token, user} = await JoblyApi.userLogin(data);
      JoblyApi.token = token;
      setToken(token);
      setCurrentUser(user);
    } catch (error) {
      console.error("There was an error logging in", error);
    }
  };

  const signup = async (data) => {
    try {
      const response = await JoblyApi.registerUser(data);
    } catch (error) {
      console.error("There was an error registering your account", error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    JoblyApi.token = null;
  };

  return (
    <>
    <Router>
      <NavBar  />
      <JoblyRoutes login={login} signup={signup}  logout={logout} />
      </Router>
    </>
  );
}

export default App;
