import { useEffect, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import JoblyRoutes from "./JoblyRoutes";
import NavBar from "./NavBar";
import "./App.css";
import JoblyApi from "../../api";
import { useUser } from "./UserContext";
import useLocalStorage from "./useLocalStorageHook";
import {jwtDecode} from 'jwt-decode';

function App() {
  const [localCurrentUser, setLocalCurrentUser] = useLocalStorage("currentUser", null);
  const [localToken, setLocalToken] = useLocalStorage("token", null);
  const { currentUser, setCurrentUser, token, setToken } = useUser();

  const syncContextWithLocalStorage = useCallback(() => {
    if (localCurrentUser !== currentUser) {
      setCurrentUser(localCurrentUser);
    }
    if (localToken !== token) {
      setToken(localToken);
    }
  }, [localCurrentUser, localToken, currentUser, token, setCurrentUser, setToken]);

  const fetchUserInfo = useCallback(async () => {
    if (localToken) {
      try {
        JoblyApi.token = localToken;
        const { username } = jwtDecode(localToken);
        const response = await JoblyApi.getUser(username);
        if (response.user && JSON.stringify(response.user) !== JSON.stringify(localCurrentUser)) {
          setLocalCurrentUser(response.user);
        }
      } catch (error) {
        console.error("There was an error fetching user information", error);
        setLocalCurrentUser(null);
      }
    }
  }, [localToken, localCurrentUser, setLocalCurrentUser]);

  useEffect(() => {
    syncContextWithLocalStorage();
  }, [syncContextWithLocalStorage]);

  useEffect(() => {
    fetchUserInfo();
  }, [localToken, fetchUserInfo]);

  const login = useCallback(async (data) => {
    try {
      const { token, user } = await JoblyApi.userLogin(data);
      JoblyApi.token = token;
      setLocalToken(token);
      setLocalCurrentUser(user);
    } catch (error) {
      console.error("There was an error logging in", error);
    }
  }, [setLocalToken, setLocalCurrentUser]);

  const signup = useCallback(async (data) => {
    try {
      await JoblyApi.registerUser(data);
    } catch (error) {
      console.error("There was an error registering your account", error);
    }
  }, []);

  const logout = useCallback(() => {
    setLocalCurrentUser(null);
    setLocalToken(null);
    JoblyApi.token = null;
  }, [setLocalCurrentUser, setLocalToken]);

  return (
    <Router>
      <NavBar />
      <JoblyRoutes login={login} signup={signup} logout={logout} />
    </Router>
  );
}

export default App;
