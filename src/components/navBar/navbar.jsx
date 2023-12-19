import React from "react";
import "./navbar.css";
import { FaCalendarAlt } from "react-icons/fa";
import { BiHomeCircle } from "react-icons/bi";
import { HiDocumentDuplicate } from "react-icons/hi";
import HailIcon from "@mui/icons-material/Hail";
import ForumIcon from "@mui/icons-material/Forum";
import { CgProfile } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link, NavLink, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import Logo from "./Logo";
import User from "./User";
import Logo2 from "./Logo2";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
} from "@mui/material";

const NavBar = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  return (
    <div id="container-nav">
      <div className="logo_nav">
        <Logo />
      </div>
      <div id="nav-up">
        <Logo2 />
        <NavLink to="/accueil" activeclassname="active" id="row">
          <BiHomeCircle id="home-icon" />
          <p id="nav-title" className="bold">
            Accueil
          </p>
        </NavLink>
        {user?.role === "admin" && (
          <NavLink to="/admin" activeclassname="active" id="row">
            <AdminPanelSettingsIcon id="home-icon" />
            <p className="bold" id="nav-title">
              Admin
            </p>
          </NavLink>
        )}
        {/* <NavLink to="/forum" activeclassname="active" id="row">
          <ForumIcon id="home-icon" />
          <p id="nav-title" className="bold">
            Forum
          </p>
        </NavLink> */}
        <div
          id="row"
          title="Cette section est en cours de développement"
          style={{ color: "gray" }}
        >
          <ForumIcon id="home-icon" />
          <p id="nav-title" className="bold">
            Forum
          </p>
        </div>
        <NavLink to="/adherents" activeclassname="active" id="row">
          <HailIcon id="home-icon" />
          <p id="nav-title" className="bold">
            Adhérents
          </p>
        </NavLink>
        {/* <NavLink to="/calendrier" activeclassname="active" id="row">
          <FaCalendarAlt id="home-icon" className="home-icon1" />
          <p id="nav-title" className="bold">
            Calendrier
          </p>
        </NavLink> */}
        <div
          id="row"
          title="Cette section est en cours de développement"
          style={{ color: "gray" }}
        >
          <FaCalendarAlt id="home-icon" />
          <p id="nav-title" className="bold">
            Calendrier
          </p>
        </div>
        {/* <NavLink to="/archives" activeclassname="active" id="row">
          <HiDocumentDuplicate id="home-icon" />
          <p id="nav-title" className="bold">
            Archives
          </p>
        </NavLink> */}
        <div
          id="row"
          title="Cette section est en cours de développement"
          style={{ color: "gray" }}
        >
          <HiDocumentDuplicate id="home-icon" />
          <p id="nav-title" className="bold">
            Archives
          </p>
        </div>
        {user?.role === "stagiaire" && (
          <NavLink to={`/profile/${user.id}`} activeclassname="active" id="row">
            <AssignmentIndIcon id="home-icon" />
            <p className="bold" id="nav-title">
              Mon cv
            </p>
          </NavLink>
        )}
        {user?.role === "adherent" && (
          <NavLink to={`/profil/${user.id}`} activeclassname="active" id="row">
            <CgProfile id="home-icon" />
            <p className="bold" id="nav-title">
              Profil
            </p>
          </NavLink>
        )}
      </div>

      <div id="bottom-nav">
        {!user ? (
          <Link to="/login" style={{ margin: "auto" }}>
            <Button
              variant="contained"
              size="small"
              endIcon={<PersonIcon />}
              sx={{
                borderRadius: "20px",
                color: "white",
                bgcolor: "#e86928",
                "&:hover": {
                  bgcolor: "#d46025",
                },
              }}
            >
              Connexion
            </Button>
          </Link>
        ) : (
          <User />
        )}
      </div>
    </div>
  );
};

export default NavBar;
