// import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import React, { Component, useEffect, useState } from "react";
// import OrderModal from "./OrderModal";
// import { useSelector } from "react-redux";
// import { getAllOrder } from "../../../redux/service/orderService";
// import MiniLoader from "../../../common/Form/MiniLoader";
// // import orders from "./listOrders";
// const OrderList = () => {
//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       width: 90,
//       description: "id of the product",
//     },
//     {
//       field: "fullname",
//       headerName: "Full Name",
//       width: 400,
//       description: "customer full name",
//       renderCell: (params) => {
//         return (
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: "100%" }}>
//             <Avatar alt="name" sx={{ width: 30, height: 30, backgroundColor: 'black' }}>
//               {params.row.customer.firstname.charAt(0).toUpperCase()}
//             </Avatar>
//             <Typography variant="subtitle2" sx={{ mx: 3 }}>
//               {`${params.row.customer.firstname || ""} ${params.row.customer.lastname || ""
//                 } `}
//             </Typography>
//           </div>
//         );
//       },
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       width: 400,
//       description: "customer Email",
//       renderCell: (params) => {
//         return params.row.customer.email || "";
//       }
//     },
//     {
//       field: "totalAmount",
//       headerName: "Total Amount",
//       width: 300,
//       description: "total amount of the order",
//       // renderCell: (params) => {
//       //   let total = 0;
//       //   for (let prod of params.row.products) {

//       //     total += prod.product.price * prod.quantity;
//       //   }

//       //   return total;
//       // },
//     },
//     {
//       field: "details",
//       headerName: "Order Details",
//       width: 300,
//       description: "the details of the order",

//       renderCell: (params) => {
//         const order = params.row;
//         return (
//           <Button
//             variant="contained"
//             sx={{ bgcolor: "#504099" }}
//             onClick={handlOrderDetail(order)}
//             aria-label={`View details for order ${order.id}`}
//           >
//             Order Details
//           </Button>
//         );
//       },
//     },
//   ];
//   const [open, setOpen] = useState(false);
//   const handleClose = () => {
//     setOpen(false);
//     setOrder({});
//   }
//   const [order, setOrder] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const { userData } = useSelector((state) => state?.persist);
//   const [orders, setOrders] = useState([]);
//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getAllOrder(userData?.id);
//       setOrders(response);
//     }
//     catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   useEffect(() => {
//     fetchData();

//   }, [])
//   const handlOrderDetail = (order) => {
//     setOpen(true);
//     setOrder(order);

//   }
//   return (
//     <Box
//       sx={{
//         margin: 3,
//         bgcolor: "white",
//         borderRadius: 2,
//         padding: 3,
//         height: "100%",
//       }}
//     >
//       <MiniLoader isLoading={isLoading} size={50} color="#1976d2" />
//       <DataGrid
//         sx={{
//           borderLeft: 0,
//           borderRight: 0,
//           borderRadius: 0,
//         }}
//         rows={orders}
//         columns={columns}
//         getRowId={(row) => row._id}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 10 },
//           },
//         }}
//         pageSizeOptions={[15, 20, 30]}
//         rowSelection={false}
//       />
//       <Modal open={open} onClose={handleClose}>
//         <Box>
//           <OrderModal order={order} handleClose={handleClose} />
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default OrderList;
import { Avatar, Box, Button, Chip, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderModal from "./OrderModal";
import { getAllOrder } from "../../../redux/service/orderService";
import MiniLoader from "../../../common/Form/MiniLoader";
import moment from "moment/moment";

const OrderList = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useSelector((state) => state?.persist);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllOrder(userData?.id);
      console.log(response);
      setOrders(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderDetail = (order) => () => {
    setOpen(true);
    setOrder(order);
  };

  const handleClose = () => {
    setOpen(false);
    setOrder({});
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 400,
      description: "ID of the product",
    },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 400,
      description: "Customer full name",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
          <Avatar
            alt="name"
            sx={{ width: 30, height: 30, backgroundColor: "black" }}
          >
            {params.row.customer.firstname.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle2" sx={{ mx: 3 }}>
            {`${params.row.customer.firstname || ""} ${params.row.customer.lastname || ""
              }`}
          </Typography>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      description: "Customer Email",
      renderCell: (params) => params.row.customer.email || "",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 200,
      description: "Total amount of the order",
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      description: "Date of the order",
      renderCell: (params) => moment(params.row.date).format("YYYY-MM-DD"),
    }
    ,
    {
      field: "status",
      headerName: "Status",
      width: 200,
      description: "Status of the order",
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === "approved" ? "success" : params.row.status === "rejected" ? "error": "primary"}
        />
      ),
    },
    {
      field: "details",
      headerName: "Order Details",
      width: 300,
      description: "The details of the order",
      renderCell: (params) => {
        const order = params.row;
        return (
          <Button
            variant="contained"
            sx={{ bgcolor: "#504099" }}
            onClick={handleOrderDetail(order)}
            aria-label={`View details for order ${order.id}`}
          >
            Order Details
          </Button>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        margin: 3,
        bgcolor: "white",
        borderRadius: 2,
        padding: 3,
        height: "100%",
      }}
    >
      <MiniLoader isLoading={isLoading} size={50} color="#1976d2" />
      <DataGrid
        sx={{
          borderLeft: 0,
          borderRight: 0,
          borderRadius: 0,
        }}
        rows={orders}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[15, 20, 30]}
        rowSelection={false}
      />
      <Modal open={open} onClose={handleClose}>
        <Box>
          <OrderModal order={order} handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderList;
