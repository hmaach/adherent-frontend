import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navbar";
import Header from "./components/header/Header";
import Accueil from "./components/accueil/Accueil";
import Stagiaire from "./components/stagiaire/Stagiaire";
import Login from "./features/auth/Login";
import Layout from "./features/auth/Layout";
import HailIcon from "@mui/icons-material/Hail";
import RequireAuth from "./features/auth/RequireAuth";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import {
  logOut,
  selectCurrentUser,
  setCredentials,
} from "./features/auth/authSlice";
import RequireAdmin from "./features/auth/RequireAdmin";
import SearchAccueil from "./components/accueil/SearchAccueil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForumIcon from "@mui/icons-material/Forum";
import Cookies from "js-cookie";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Archives from "./components/archives/Archives";
import Calendar from "./components/calandar/calendar";
import { getFilieres } from "./app/api/filiereAxios";
import { checkAuth } from "./app/api/checkAuthAxios";
import RemoveCookie from "./cookies/JWT/RemoveCookie";
import Adherents from "./components/adherents/Adherents";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { BiHomeCircle } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Forum from "./components/forum/Forum";
import InfoAlert from "./components/InfoAlert";
import Page404 from "./components/404/Page404";
import AdminPanel from "./components/admin-panel/AdminPanel";
// import Login2 from "./features/auth/Login1";
const { localStorage } = window;

const App = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const containerId = isAdminRoute ? "container-admin" : "container";
  const containerStyle = isAdminRoute ? { display: "flex" } : {};

  const localToken = localStorage.getItem("token");
  const token1 = localToken ? localToken.replace(`\"`, "") : null;
  const token = token1 ? token1.replace(`\"`, "") : null;

  const [showDialog, setShowDialog] = useState(true);

  const handleCloseDialog = () => {
    Cookies.set("dialogClosed", "true", { expires: 30 });

    setShowDialog(false);
  };

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

  // useEffect(() => {
  //   checkAuthFunction();
  // }, []);

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
          <Route path="/" element={<Accueil />} />
          <Route index path="/accueil" element={<Accueil />} />
          <Route index path="/recherche" element={<SearchAccueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adherents" element={<Adherents />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/calendrier" element={<Calendar />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}

          <Route path="/c" element={<Calendar />} />
          <Route path="/profil/:id" element={<Stagiaire />} />
          {/* <Route path='/profil' element={<Stagiaire />} /> */}

          {/* protected routes (require login) */}
          <Route element={<RequireAuth />}></Route>

          {/* admin routes */}
          <Route element={<RequireAdmin />}></Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      {/* <div className="phone-nav">
        <Box
        // sx={{ width: "100%" }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </div> */}
      {showDialog && !Cookies.get("dialogClosed") && (
        <InfoAlert open={true} handleClose={handleCloseDialog} />
      )}
    </div>
  );
};

const NavBarWrapper = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const isLoginRoute = location.pathname === "/login";
  const is404Route = location.pathname === "/404";
  const isAdminRoute = location.pathname.startsWith("/admin");
  const cur_user = useSelector(selectCurrentUser);
  if (isLoginRoute || is404Route) {
    return (
      <div className="unableNav" id="nav-box">
        <NavBar />
      </div>
    );
  }
  return (
    <>
      <div id="nav-box">
        <NavBar />
      </div>
      <div className="phone-nav">
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              component={NavLink}
              to="/accueil"
              label="Accueil"
              icon={<BiHomeCircle />}
            />
            <BottomNavigationAction
              component={NavLink}
              to="/forum"
              label="Forum"
              icon={<ForumIcon />}
            />
            <BottomNavigationAction
              component={NavLink}
              to="/adherents"
              label="Adhérents"
              icon={<HailIcon />}
            />
            <BottomNavigationAction
              component={NavLink}
              to="/calendrier"
              label="Calendrier"
              icon={<FaCalendarAlt className="home-icon1" />}
            />
            {cur_user?.role === "adherent" && (
              <BottomNavigationAction
                component={NavLink}
                to={`/profil/${cur_user.id}`}
                label="Profil"
                icon={<CgProfile id="home-icon" />}
              />
            )}
          </BottomNavigation>
        </Box>
      </div>
    </>
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
