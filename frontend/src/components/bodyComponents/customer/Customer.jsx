import React, { Component } from "react";
import CustomerList from "./CustomerList";
import { Box, Typography } from "@mui/material";
export default class Customer extends Component {
  render() {
    return (
      <Box sx={{ m: 0, p: 3, width: "100%" }}>
        <Typography variant="h3" sx={{ m: 3, fontWeight: "bold" }}>
          Customers
        </Typography>
        
        <CustomerList />
      </Box>
    );
  }
}
