import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import SIgnup from "../Pages/SIgnup";
import Login from "../Pages/Login";
import Dashboards from "../Pages/Dashboards";
import ProtectedRoute from "./ProtectedRoute";
const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/register" element={<SIgnup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboards />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  );
};

export default AllRoutes;
