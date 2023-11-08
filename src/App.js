import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navbar";
import Header from "./components/header/Header";
import Accueil from "./components/accueil/Accueil";
import Stagiaire from "./components/stagiaire/Stagiaire";
import Login from "./features/auth/Login";
import Layout from "./features/auth/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import { useDispatch } from "react-redux";
import { logOut, setCredentials } from "./features/auth/authSlice";
import RequireAdmin from "./features/auth/RequireAdmin";
import SearchAccueil from "./components/accueil/SearchAccueil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Archives from "./components/archives/Archives";
import Calendar from "./components/calandar/calendar";
import { getFilieres } from "./app/api/filiereAxios";
import { checkAuth } from "./app/api/checkAuthAxios";
import RemoveCookie from "./cookies/JWT/RemoveCookie";
import Adherents from "./components/adherents/Adherents";
const { localStorage } = window;

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const containerId = isAdminRoute ? "container-admin" : "container";
  const containerStyle = isAdminRoute ? { display: "flex" } : {};

  const localToken = localStorage.getItem("token");
  const token1 = localToken ? localToken.replace(`\"`, "") : null;
  const token = token1 ? token1.replace(`\"`, "") : null;

  useEffect(() => {
    const storedCredentials = localStorage.getItem("credentials");
    if (storedCredentials) {
      const credentials = JSON.parse(storedCredentials);
      dispatch(setCredentials(credentials));
    }

    // if (token) {
    //   getFilieres(token)
    //     .then((data) => {
    //       setFilieres(data.filieres);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }, [dispatch]);

  const checkAuthFunction = async () => {
    try {
      checkAuth(token)
        .then((data) => {
          if (data.message === true) {
            console.log(data.message);
          }
        })
        .catch((error) => {
          dispatch(logOut());
          RemoveCookie("jwt");
          localStorage.removeItem("credentials");
          localStorage.removeItem("token");
        });
    } catch (error) {
      dispatch(logOut());
      RemoveCookie("jwt");
      localStorage.removeItem("credentials");
      localStorage.removeItem("token");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && token) {
    dispatch(setCredentials({ user, token }));
  }

  useEffect(() => {
    checkAuthFunction();
  }, []);

  return (
    <div id={containerId} style={containerStyle}>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <HeaderWrapper /> */}
      <NavBarWrapper />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index path="/accueil" element={<Accueil />} />
          <Route index path="/recherche" element={<SearchAccueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Accueil />} />
          <Route path="/adherents" element={<Adherents />} />

          <Route path="/archives" element={<Archives />} />
          <Route path="/calendrier" element={<Calendar />} />
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}

          <Route path="/c" element={<Calendar />} />
          <Route path="/profil/:id" element={<Stagiaire />} />
          {/* <Route path='/profil' element={<Stagiaire />} /> */}

          {/* protected routes (require login) */}
          <Route element={<RequireAuth />}></Route>

          {/* admin routes */}
          <Route element={<RequireAdmin />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

const NavBarWrapper = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  const isAdminRoute = location.pathname.startsWith("/admin");
  if (isLoginRoute || isAdminRoute) {
    return (
      <div className="unableNav" id="nav-box">
        <NavBar />
      </div>
    );
  }
  return (
    <div id="nav-box">
      <NavBar />
    </div>
  );
};
const HeaderWrapper = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isLoginRoute || isAdminRoute) {
    return null;
  }
  return <Header />;
};

export default App;
