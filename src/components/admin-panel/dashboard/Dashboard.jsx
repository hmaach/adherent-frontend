import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import api from "../../../app/api/baseURL";
import GetCookie from "../../../cookies/JWT/GetCookie";

// Mock Data for Charts to ensure the presentation looks amazing instantly
const revenueData = [
  {
    id: "Revenue",
    color: "hsl(217, 70%, 50%)",
    data: [
      { x: "Jan", y: 1200 },
      { x: "Feb", y: 2100 },
      { x: "Mar", y: 1800 },
      { x: "Apr", y: 3200 },
      { x: "May", y: 4500 },
      { x: "Jun", y: 5800 },
    ],
  },
];

const sectorData = [
  { id: "Plomberie", label: "Plomberie", value: 35, color: "hsl(217, 70%, 50%)" },
  { id: "Informatique", label: "Informatique", value: 25, color: "hsl(142, 70%, 50%)" },
  { id: "Électricité", label: "Électricité", value: 20, color: "hsl(43, 70%, 50%)" },
  { id: "Menuiserie", label: "Menuiserie", value: 10, color: "hsl(348, 70%, 50%)" },
  { id: "Autres", label: "Autres", value: 10, color: "hsl(271, 70%, 50%)" },
];

const StatCard = ({ title, value, icon, color, delay }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "15px",
      background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,1) 100%)`,
      position: "relative",
      overflow: "hidden",
      animation: `slideUp 0.6s ease-out ${delay}s both`,
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      },
      "@keyframes slideUp": {
        "0%": { opacity: 0, transform: "translateY(20px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    }}
  >
    <Box sx={{ zIndex: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2d3748", mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: "#718096", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
        {title}
      </Typography>
    </Box>
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: "50%",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      }}
    >
      {icon}
    </Box>
    {/* Decorative Background Circle */}
    <Box sx={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", zIndex: 1 }} />
  </Paper>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 142,
    activeSubs: 89,
    revenue: "12,450 DH",
    pending: 12
  });

  return (
    <Box sx={{ animation: "fadeIn 0.5s ease-in", "@keyframes fadeIn": { "0%": { opacity: 0 }, "100%": { opacity: 1 } } }}>
      
      {/* KPI Cards Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Revenu Mensuel (MRR)" value={stats.revenue} icon={<AttachMoneyIcon sx={{ fontSize: 40, color: "#38a169" }} />} color="#e6fffa" delay={0.1} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Abonnements Actifs" value={stats.activeSubs} icon={<VerifiedUserIcon sx={{ fontSize: 40, color: "#3182ce" }} />} color="#ebf8ff" delay={0.2} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Utilisateurs Totaux" value={stats.users} icon={<GroupIcon sx={{ fontSize: 40, color: "#805ad5" }} />} color="#faf5ff" delay={0.3} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Annonces en Attente" value={stats.pending} icon={<PendingActionsIcon sx={{ fontSize: 40, color: "#dd6b20" }} />} color="#fffaf0" delay={0.4} />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3}>
        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: "15px", height: "400px", animation: "slideUp 0.6s ease-out 0.5s both" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#4a5568" }}>
              Évolution des Revenus (6 derniers mois)
            </Typography>
            <Box sx={{ height: "300px" }}>
              <ResponsiveLine
                data={revenueData}
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Mois', legendOffset: 36, legendPosition: 'middle' }}
                axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Revenu (DH)', legendOffset: -50, legendPosition: 'middle' }}
                enableGridX={false}
                colors={{ scheme: 'category10' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableArea={true}
                areaOpacity={0.15}
                useMesh={true}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: "15px", height: "400px", animation: "slideUp 0.6s ease-out 0.6s both" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#4a5568" }}>
              Répartition par Secteurs
            </Typography>
            <Box sx={{ height: "300px" }}>
              <ResponsivePie
                data={sectorData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.6}
                padAngle={1.5}
                cornerRadius={5}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                enableArcLinkLabels={false}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;