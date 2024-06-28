import React from "react";
import NavBarComponent from "./NavBarComponent";
import { Box, Grid } from "@mui/material";
import SideBarComponent from "./SideBarComponent";
import { Outlet } from "react-router-dom";
import { PrivateRoute } from "../common/routes/Check_Routes";

export default function RootComponent() {
  return (
    <PrivateRoute>
      <Box sx={{ width:"100%" }}>

        <NavBarComponent />
        <Box
          sx={
            {
              // bgcolor: "#DEE3E9",
              // height: 899,
            }
          }
        >
          <Grid container spacing={0}>
            <Grid item md={2} sm={0}>
              <SideBarComponent />
            </Grid>
            <Grid item md={10}>
              <Outlet />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PrivateRoute>
  );
}
