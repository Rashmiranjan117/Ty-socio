import React, { ReactNode } from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const cookie = new Cookies();
  const toast = useToast();
  const token = cookie.get("isauth");
  // console.log("Protected Route", token);
  if (!token) {
    toast({
      status: "warning",
      isClosable: true,
      duration: 5000,
      title: "Login First!",
    });
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
