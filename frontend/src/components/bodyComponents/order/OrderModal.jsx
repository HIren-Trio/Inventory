// import { Delete, DeleteOutline } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";

// export default function OrderModal({ order, handleClose }) {
//   console.log("the order lists are :\n", order.products[0].product.name);
//   const handleDeleteProductFromOrder = (orderId, productId) => {
//     console.log(
//       "delete the product : ",
//       productId,
//       " from the order ",
//       orderId
//     );

//   };
//   const tableRows = order.products.map((orderProduct, index) => {
//     return (
//       <TableRow key={index}>
//         <TableCell>{orderProduct.product.name}</TableCell>
//         <TableCell>{orderProduct.quantity}</TableCell>
//         <TableCell>{orderProduct.product.stock}</TableCell>
//         <TableCell>
//           <IconButton
//             onClick={() =>
//               handleDeleteProductFromOrder(order.id, orderProduct.product.id)
//             }
//           >
//             <DeleteOutline color="error" />
//           </IconButton>
//         </TableCell>
//       </TableRow>
//     );
//   });
//   console.log(tableRows);
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         left: "50%",
//         top: "50%",
//         transform: "translate(-50%, -50%)",
//         width: "50%",
//         bgcolor: "white",

//         borderRadius: 2,
//         boxShadow: 24,
//         p: 4,
//       }}
//     >
//       <Box sx={{ color: "black", display: "flex", flexDirection: "column" }}>
//         <Paper
//           elevation={0}
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//             m: 0,
//           }}
//         >
//           <Typography variant="h6" sx={{ m: 3 }}>
//             OrderList
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: "red", m: 3, px: 12, fontSize: "large", borderRadius: "100%", width: "1px", height: "50px" }}
//             onClick={()=>{handleClose}}

//           >
//             &times;
//           </Button>
//         </Paper>
//         <Paper
//           elevation={0}
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "30%",
//             m: 3,
//           }}
//         >
//           <Typography variant="subtitle1">First Name </Typography>
//           <Typography variant="subtitle1" color={"grey"}>
//             {order.customer.firstname || ""}
//           </Typography>
//         </Paper>
//         <Paper
//           elevation={0}
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "30%",
//             m: 3,
//           }}
//         >
//           <Typography variant="subtitle1">Last Name </Typography>
//           <Typography variant="subtitle1" color={"grey"}>
//             {order.customer.lastname || ""
//             }
//           </Typography>
//         </Paper>
//         <Paper
//           elevation={0}
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "30%",
//             m: 3,
//           }}
//         >
//           <Typography variant="subtitle1">Email </Typography>
//           <Typography variant="subtitle1" color={"grey"}>
//             {order.customer.email}
//           </Typography>
//         </Paper>
//         <Box>
//           <TableContainer sx={{ marginBottom: 3 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Product Name</TableCell>
//                   <TableCell>Quantity</TableCell>
//                   <TableCell>Stcok Availability</TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {/* loop through the product list */}
//                 {tableRows}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Paper
//             elevation={0}
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "100%",
//               m: 0,
//             }}
//           >
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "error.main", m: 3, px: 12 }}
//             >
//               Reject
//             </Button>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "#504099", m: 3, px: 12 }}
//             >
//               Approve
//             </Button>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
import { DeleteOutline } from "@mui/icons-material";
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
import { changeStatusById, deleteProductFromOrder } from "../../../redux/service/orderService";

export default function OrderModal({ order, handleClose }) {
  const handleDeleteProductFromOrder = async (orderId, productId) => {
    const payload = {
      id: orderId,
      productId
    }
    try {
      const response = await deleteProductFromOrder(payload);
      // setOrders(response);
      alert(response?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      const payload = {
        id, status
      }
      const response = await changeStatusById(payload);
      alert(response?.message);
      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  }


  const tableRows = order.products.map((orderProduct, index) => {
    return (
      <TableRow key={index}>
        <TableCell>{orderProduct.product.name}</TableCell>
        <TableCell>{orderProduct.quantity}</TableCell>
        <TableCell>{orderProduct.product.stock}</TableCell>
        <TableCell>
          <IconButton
            onClick={() =>
              handleDeleteProductFromOrder(order._id, orderProduct._id)
            }
          >
            <DeleteOutline color="error" />
          </IconButton>
        </TableCell>
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
          {order.status === "pending" && <Paper
            elevation={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              m: 0,
            }}
          >
            <Button
              variant="contained"
              sx={{ bgcolor: "error.main", m: 3, px: 12 }}
              onClick={() => {
                changeStatus(order._id, "rejected")
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#504099", m: 3, px: 12 }}
              onClick={() => {
                changeStatus(order._id, "approved")
              }}
            >
              Approve
            </Button>
          </Paper>}
        </Box>
      </Box>
    </Box>
  );
}
