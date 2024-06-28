import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { userData } = useSelector((state) => state?.persist);

  return userData?.token && !userData?.userId ? children : !userData?.userId ? <Navigate to="/login" /> : <Navigate to="/customer/login" />;
};

export const AuthRoute = ({ children }) => {
  const { userData } = useSelector((state) => state?.persist);

  return !userData?.token ? children : <Navigate to="/" />;
};

export const CustomerPrivateAuth = ({ children }) => {
  const { userData } = useSelector((state) => state?.persist);

  return userData?.token && userData?.userId ? children : userData?.userId ? <Navigate to="/customer/login" /> : <Navigate to="/login" />;
};
export const CustomerAuthRoute = ({ children }) => {
  const { userData } = useSelector((state) => state?.persist);

  return !userData?.token ? children : <Navigate to="/customer" />;
};
