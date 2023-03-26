import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main.js";
import { MyTrips } from "./pages/MyTrips.js";
import { Header } from './components/Header.js';
// import { Explore } from './pages/Explore.js';
// import { BucketList } from './pages/BucketList.js';
import { Login } from './pages/Login.js';
import { Signup } from './pages/Signup.js';
import './index.css';
import './App.css';
import './pages/pages.css';
import useToken from './useToken';
import { ProtectedRoute } from './components/ProtectedRoute.js';
import { PageNotFound } from './pages/PageNotFound';

export function App() {
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Header token={ token } setToken={ setToken } />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route 
          path="/mytrips" 
          element={
            <ProtectedRoute token={ token }>
              <MyTrips />
            </ProtectedRoute>
          } />
        {/* <Route path="/explore" element={<Explore />} /> */}
        {/* <Route 
          path="/bucketlist" 
          element={
            <ProtectedRoute token={ token }>
              <BucketList />
            </ProtectedRoute>
          } /> */}
        <Route path="/signup" element={<Signup setToken={ setToken } token={ token }/>} />
        <Route path="/login" element={<Login setToken={ setToken } token={ token } />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}