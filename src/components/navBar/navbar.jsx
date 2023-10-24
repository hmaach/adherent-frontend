import React from "react";
import "./navbar.css";
import { FaCalendarAlt } from "react-icons/fa";
import { BiHomeCircle } from "react-icons/bi";
import { HiDocumentDuplicate } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";

import { Link, NavLink, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import Logo from "./Logo";
import User from "./User";
import Logo2 from "./Logo2";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { Button } from "@mui/material";

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
        <NavLink to="/calendrier" activeclassname="active" id="row">
          <FaCalendarAlt id="home-icon" className="home-icon1" />
          <p id="nav-title" className="bold">
            Calendrier
          </p>
        </NavLink>
        {/*         <NavLink to="/stagiaires" activeclassname="active" id="row">
          <IoIosPeople id="home-icon" />
          <p id="nav-title" className="bold">
            Stagiaires
          </p>
        </NavLink> */}
        <NavLink to="/archives" activeclassname="active" id="row">
          <HiDocumentDuplicate id="home-icon" />
          <p id="nav-title" className="bold">
            Archives
          </p>
        </NavLink>
        {user?.role === "stagiaire" && (
          <NavLink to={`/profile/${user.id}`} activeclassname="active" id="row">
            <AssignmentIndIcon id="home-icon" />
            <p className="bold" id="nav-title">
              Mon cv
            </p>
          </NavLink>
        )}
        {/* {user?.role === "admin" && (
          <NavLink to="/admin" activeclassname="active" id="row">
            <AdminPanelSettingsIcon id="home-icon" />
            <p className="bold" id="nav-title">
              Admin
            </p>
          </NavLink>
        )} */}
        {/* {user && ( */}
        <NavLink to="/profil" activeclassname="active" id="row">
          <CgProfile id="home-icon" />
          <p className="bold" id="nav-title">
            Profil
          </p>
        </NavLink>
        {/* )} */}
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
