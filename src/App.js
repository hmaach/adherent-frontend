import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navbar";
import Header from "./components/header/Header";
import Accueil from "./components/accueil/Accueil";
import Calendrier from "./components/calendrier/Calendrier";
import Stagiaires from "./components/stagiaires/Stagiaires";
import Stagiaire from "./components/stagiaire/Stagiaire";
import Login from "./features/auth/Login";
import Layout from "./features/auth/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";
import RequireAdmin from "./features/auth/RequireAdmin";
import SearchAccueil from "./components/accueil/SearchAccueil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile/Profile";
import Archives from "./components/archives/Archives";
// import Calendar from "./components/calandar/Calandar";
// import Topbar from "./components/admin/scenes/global/Topbar";
// import Sidebar from "./components/admin/scenes/global/Sidebar";
// import Dashboard from "./components/admin/scenes/dashboard";
// import Team from "./components/admin/scenes/team";
// import Invoices from "./components/admin/scenes/invoices";
// import Contacts from "./components/admin/scenes/contacts";
// import Bar from "./components/admin/scenes/bar";
// import Form from "./components/admin/scenes/form";
// import Line from "./components/admin/scenes/line";
// import Pie from "./components/admin/scenes/pie";
// import FAQ from "./components/admin/scenes/faq";
// import Geography from "./components/admin/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar1 from "./components/admin/scenes/calendar/calendar";
// import AdminRoutes from "./components/admin/AdminRoutes";
import Calendar from "./components/calandar/calendar";
import { getFiliere } from "./features/filiere/filiereSlice";
import { getFilieres } from "./app/api/filiereAxios";
const { localStorage } = window;

const App = () => {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [filieres, setFilieres] = useState([]);
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

    if (token) {
      getFilieres(token)
        .then((data) => {
          setFilieres(data.filieres);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFiliere(filieres));
  }, [filieres]);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && token) {
    dispatch(setCredentials({ user, token }));
  }
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
          <Route path="/stagiaires" element={<Stagiaires />} />
          <Route path="/stagiaire" element={<Stagiaire />} />

          <Route path="/archives" element={<Archives />} />
          <Route path="/calendrier" element={<Calendar />} />
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}


          <Route path='/c' element={<Calendar />} />
          <Route path='/profile/:id' element={<Stagiaire />} />
          <Route path='/profil' element={<Stagiaire />} />

          {/* protected routes (require login) */}
          <Route element={<RequireAuth />}>

            
          </Route>

          {/* admin routes */}
          <Route element={<RequireAdmin />}></Route>
        </Route>
      </Routes>

      {/* <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <div className="app"> */}
      {/* {isAdminRoute && <Sidebar isSidebar={isSidebar} />}

          <main className={isAdminRoute ? "admin-content" : " content"}>
            {isAdminRoute && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/team" element={<Team />} />
              <Route path="/admin/contacts" element={<Contacts />} />
              <Route path="/admin/invoices" element={<Invoices />} />
              <Route path="/admin/form" element={<Form />} />
              <Route path="/admin/bar" element={<Bar />} />
              <Route path="/admin/pie" element={<Pie />} />
              <Route path="/admin/line" element={<Line />} />
              <Route path="/admin/faq" element={<FAQ />} />
              <Route path="/admin/calendar" element={<Calendar1 />} />
              <Route path="/admin/geography" element={<Geography />} />
            </Routes>
          </main> */}
      {/* </div> */}
      {/* </ThemeProvider> */}
      {/* </ColorModeContext.Provider> */}
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
