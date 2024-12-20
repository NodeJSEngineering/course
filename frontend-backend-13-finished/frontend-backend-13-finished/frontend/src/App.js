import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState(false);

  // const login = useCallback(uid => {
  //   setIsLoggedIn(true);
  //   setUserId(uid);
  // }, []);

  // const logout = useCallback(() => {
  //   setIsLoggedIn(false);
  //   setUserId(null);
  // }, []);

  let routes;
  // if (isLoggedIn) {
  if (token) {
    routes = (
      <Routes>
        <Route path="/" exact="true" element={<Users />}>
        </Route>
        <Route path="/:userId/places" exact="true" element={<UserPlaces />}>
        </Route>
        <Route path="/places/new" exact="true" element={<NewPlace />}>
        </Route>
        <Route path="/places/:placeId" element={<UpdatePlace />}>
        </Route>
        <Route element={<Navigate to="/" />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact="true" element={<Users />}>
        </Route>
        <Route path="/:userId/places" exact="true" element={<UserPlaces />}>
        </Route>
        <Route path="/auth" element={<Auth />}>
        </Route>
        <Route element={<Navigate to="/auth" />}></Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
