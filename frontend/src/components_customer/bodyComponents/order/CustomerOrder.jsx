import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import CustomerOrderList from "./CustomerOrderList";

export default class CustomerOrder extends Component {
    render() {
        return (
            <Box sx={{ m: 0, p: 3, width: "100%" }}>
                <Typography variant="h3" sx={{ m: 3, fontWeight: "bold" }}>
                    Your Orders
                </Typography>
                <CustomerOrderList />
            </Box>
        );
    }
}
