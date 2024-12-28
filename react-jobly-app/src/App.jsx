import { useEffect, useCallback } from "react";
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
  const { setCurrentUser: setContextUser, setToken: setContextToken } = useUser();
  
  const syncContextWithLocalStorage = useCallback(() => {
    if (currentUser !== setContextUser) {
      setContextUser(currentUser);
    }
    if (token !== setContextToken) {
      setContextToken(token);
    }
  }, [currentUser, token, setContextUser, setContextToken]);

  const fetchUserInfo = useCallback(async () => {
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
  }, [token, setCurrentUser]);

  useEffect(() => {
    syncContextWithLocalStorage();
    fetchUserInfo();
  }, [syncContextWithLocalStorage, fetchUserInfo]);

  const login = useCallback(async (data) => {
    try {
      const { token, user } = await JoblyApi.userLogin(data);
      JoblyApi.token = token;
      setToken(token);
      setCurrentUser(user);
    } catch (error) {
      console.error("There was an error logging in", error);
    }
  }, [setToken, setCurrentUser]);

  const signup = useCallback(async (data) => {
    try {
      await JoblyApi.registerUser(data);
    } catch (error) {
      console.error("There was an error registering your account", error);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
    JoblyApi.token = null;
  }, [setCurrentUser, setToken]);

  return (
    <Router>
      <NavBar />
      <JoblyRoutes login={login} signup={signup} logout={logout} />
    </Router>
  );
}

export default App;
