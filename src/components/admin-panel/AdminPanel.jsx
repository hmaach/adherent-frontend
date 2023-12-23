import React, { useState } from "react";
import "./adminPanel.css";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Announces from "./announces/Announces";
import Users from "./users/Users";
import Rapports from "./rapports/Rapports";
import GroupIcon from "@mui/icons-material/Group";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import WorkIcon from "@mui/icons-material/Work";
import Secteurs from "./secteurs/Secteurs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Dashboard from "./dashboard/Dashboard";

const AdminPanel = () => {
  const [value, setValue] = useState("dashboard");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "80%",
        typography: "body1",
        borderLeft: 1,
        borderColor: "divider",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab
              sx={{ minHeight: "30px" }}
              icon={<DashboardIcon />}
              iconPosition="start"
              label="Tableau de bord"
              value="dashboard"
            />{" "}
            <Tab
              sx={{ minHeight: "30px" }}
              icon={<DynamicFeedIcon />}
              iconPosition="start"
              label="Annonces"
              value="announces"
            />
            <Tab
              sx={{ minHeight: "30px" }}
              icon={<GroupIcon />}
              iconPosition="start"
              label="Utilisateurs"
              value="utilisateurs"
            />
            <Tab
              sx={{ minHeight: "30px" }}
              icon={<WorkIcon />}
              iconPosition="start"
              label="Secteurs d'activités"
              value="secteurs"
            />
            <Tab
              sx={{ minHeight: "30px" }}
              icon={<SupportAgentIcon />}
              iconPosition="start"
              label="Rapports"
              value="rapports"
            />
          </TabList>
        </Box>
        <TabPanel value="dashboard">
          <Dashboard />
        </TabPanel>
        <TabPanel value="announces">
          <Announces />
        </TabPanel>
        <TabPanel value="utilisateurs">
          <Users />
        </TabPanel>
        <TabPanel value="secteurs">
          <Secteurs />
        </TabPanel>
        <TabPanel value="rapports">
          <Rapports />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AdminPanel;
