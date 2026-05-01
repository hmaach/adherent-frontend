import React, { useState } from "react";
import "./adminPanel.css";
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import WorkIcon from "@mui/icons-material/Work";
import PaymentIcon from '@mui/icons-material/Payment';
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Dashboard from "./dashboard/Dashboard";
import Calendar from "../calandar/calendar";
import Announces from "./announces/Announces";
import Users from "./users/Users";
import Secteurs from "./secteurs/Secteurs";
import Rapports from "./rapports/Rapports";
import Abonnements from "./abonnements/Abonnements";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import RemoveCookie from "../../cookies/JWT/RemoveCookie";

const drawerWidth = 260;

const AdminPanel = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    RemoveCookie("jwt");
    window.localStorage.removeItem("credentials");
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: <DashboardIcon /> },
    { id: "calendrier", label: "Calendrier", icon: <FaCalendarAlt /> },
    { id: "announces", label: "Annonces", icon: <DynamicFeedIcon /> },
    { id: "utilisateurs", label: "Utilisateurs", icon: <GroupIcon /> },
    { id: "abonnements", label: "Abonnements", icon: <PaymentIcon /> },
    { id: "secteurs", label: "Secteurs d'activités", icon: <WorkIcon /> },
    { id: "rapports", label: "Rapports", icon: <SupportAgentIcon /> },
  ];

  const drawer = (
    <Box sx={{ backgroundColor: "#343a40", height: "100%", color: "#c2c7d0", display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #4b545c', minHeight: '64px !important' }}>
         <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', letterSpacing: 1 }}>
            AdminLTE 4
         </Typography>
      </Toolbar>
      
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #4b545c' }}>
          <Box sx={{ width: 35, height: 35, borderRadius: '50%', backgroundColor: '#007bff', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', mr: 2 }}>
             SA
          </Box>
          <Typography sx={{ color: '#d0d4db', fontWeight: 500 }}>Super Admin</Typography>
      </Box>

      <List sx={{ pt: 2, px: 1, flexGrow: 1 }}>
        <Typography variant="caption" sx={{ pl: 2, color: '#8f959e', fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' }}>
            Menu Principal
        </Typography>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5, mt: 1 }}>
              <ListItemButton
                onClick={() => setActiveTab(item.id)}
                sx={{
                  borderRadius: '5px',
                  backgroundColor: isActive ? "#007bff" : "transparent",
                  color: isActive ? "white" : "#c2c7d0",
                  "&:hover": {
                    backgroundColor: isActive ? "#007bff" : "rgba(255,255,255,0.1)",
                    color: "white"
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "white" : "#c2c7d0", minWidth: '40px' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '15px' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid #4b545c' }}>
          <Button 
             fullWidth 
             variant="contained" 
             color="error" 
             startIcon={<ExitToAppIcon />}
             onClick={handleLogout}
             sx={{ textTransform: 'none' }}
          >
             Déconnexion
          </Button>
      </Box>
    </Box>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "calendrier": return <Calendar />;
      case "announces": return <Announces />;
      case "utilisateurs": return <Users />;
      case "abonnements": return <Abonnements />;
      case "secteurs": return <Secteurs />;
      case "rapports": return <Rapports />;
      default: return <Dashboard />;
    }
  };

  const getActiveLabel = () => {
    return menuItems.find(m => m.id === activeTab)?.label || "Dashboard";
  };

  return (
    <Box sx={{ display: "flex", width: "100%", minHeight: "100vh", backgroundColor: "#f4f6f9" }}>
      <CssBaseline />
      
      {/* AppBar / Header */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
             <IconButton
               color="inherit"
               aria-label="open drawer"
               edge="start"
               onClick={handleDrawerToggle}
               sx={{ mr: 2, display: { sm: "none" } }}
             >
               <MenuIcon />
             </IconButton>
             <IconButton onClick={() => navigate('/accueil')} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                 <FaHome style={{ fontSize: '20px', color: '#6c757d' }} />
             </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar / Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="admin folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} 
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, backgroundColor: "#343a40", borderRight: 'none' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, backgroundColor: "#343a40", borderRight: 'none' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f4f6f9",
          minHeight: "100vh",
          display: "block"
        }}
      >
        <Toolbar /> 
        
        {/* Content Header */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
           <Typography variant="h5" sx={{ fontWeight: 400, color: '#212529', m: 1 }}>{getActiveLabel()}</Typography>
           <Typography variant="body2" sx={{ color: '#6c757d', m: 1 }}>
               <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/accueil')}>Accueil</span> / Admin / {getActiveLabel()}
           </Typography>
        </Box>

        {activeTab === 'dashboard' ? (
            <Box sx={{ pt: 1 }}>
                {renderContent()}
            </Box>
        ) : (
            <Box sx={{ 
                backgroundColor: 'white', 
                borderRadius: '0.25rem', 
                boxShadow: '0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)',
                p: 3,
                overflowX: 'auto'
            }}>
                {renderContent()}
            </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanel;
