import React, { useState } from "react";
import "./adminPanel.css";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Announces from "./announces/Announces";
import Users from "./users/Users";
import Adherents from "./adherents/Adherents";
import Rapports from "./rapports/Rapports";
import GroupIcon from "@mui/icons-material/Group";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import WorkIcon from "@mui/icons-material/Work";
import Secteurs from "./secteurs/Secteurs";

const AdminPanel = () => {
  const [value, setValue] = useState("announces");

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
              icon={<DynamicFeedIcon />}
              iconPosition="start"
              label="Announces"
              value="announces"
            />
            <Tab
              icon={<GroupIcon />}
              iconPosition="start"
              label="Utilisateurs"
              value="utilisateurs"
            />
            <Tab
              icon={<SensorOccupiedIcon />}
              iconPosition="start"
              label="Adherents"
              value="adherents"
            />
            <Tab
              icon={<WorkIcon />}
              iconPosition="start"
              label="Secteurs d'activités"
              value="secteurs"
            />
            <Tab
              icon={<SupportAgentIcon />}
              iconPosition="start"
              label="Rapports"
              value="rapports"
            />
          </TabList>
        </Box>
        <TabPanel value="announces">
          <Announces />
        </TabPanel>
        <TabPanel value="utilisateurs">
          <Users />
        </TabPanel>
        <TabPanel value="adherents">
          <Adherents />
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
