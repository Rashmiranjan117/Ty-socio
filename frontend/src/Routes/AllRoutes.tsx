import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import SIgnup from "../Pages/SIgnup";
import Login from "../Pages/Login";
import Dashboards from "../Pages/Dashboards";
const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/register" element={<SIgnup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboards />} />
      </Routes>
    </Box>
  );
};

export default AllRoutes;
