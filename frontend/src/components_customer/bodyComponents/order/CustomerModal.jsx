
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";

export default function CustomerOrderModal({ order, handleClose }) {
    

    const tableRows = order.products.map((orderProduct, index) => {
        return (
            <TableRow key={index}>
                <TableCell>{orderProduct.product.name}</TableCell>
                <TableCell>{orderProduct.quantity}</TableCell>
                <TableCell>{orderProduct.product.stock}</TableCell>
            </TableRow>
        );
    });

    return (
        <Box
            sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
            }}
        >
            <Box sx={{ color: "black", display: "flex", flexDirection: "column" }}>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        m: 0,
                    }}
                >
                    <Typography variant="h6" sx={{ m: 3 }}>
                        Order List
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "red",
                            m: 3,
                            px: 12,
                            fontSize: "large",
                            borderRadius: "100%",
                            width: "1px",
                            height: "50px",
                        }}
                        onClick={handleClose}
                    >
                        &times;
                    </Button>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "30%",
                        m: 3,
                    }}
                >
                    <Typography variant="subtitle1">First Name </Typography>
                    <Typography variant="subtitle1" color={"grey"}>
                        {order.customer.firstname || ""}
                    </Typography>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "30%",
                        m: 3,
                    }}
                >
                    <Typography variant="subtitle1">Last Name </Typography>
                    <Typography variant="subtitle1" color={"grey"}>
                        {order.customer.lastname || ""}
                    </Typography>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "30%",
                        m: 3,
                    }}
                >
                    <Typography variant="subtitle1">Email </Typography>
                    <Typography variant="subtitle1" color={"grey"}>
                        {order.customer.email}
                    </Typography>
                </Paper>
                <Box>
                    <TableContainer sx={{ marginBottom: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Stock Availability</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{tableRows}</TableBody>
                        </Table>
                    </TableContainer>
                   
                </Box>
            </Box>
        </Box>
    );
}
