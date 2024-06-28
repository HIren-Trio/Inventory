// import { Avatar, Box, Button, Chip, Modal, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getOrderByCustomerId } from "../../../redux/service/orderService";
// import MiniLoader from "../../../common/Form/MiniLoader";
// import moment from "moment/moment";
// import CustomerOrderModal from "./CustomerModal";
// import AddOrderForm from "./AddOrderForm";

// const CustomerOrderList = () => {
//     const [open, setOpen] = useState(false);
//     const [order, setOrder] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const { userData } = useSelector((state) => state?.persist);
//     const [orders, setOrders] = useState([]);
//     const [showOrderForm, setShowOrderForm] = useState(false);
//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//             const response = await getOrderByCustomerId(userData?.id);
//             console.log(userData?.id);
//             setOrders(response);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleOrderDetail = (order) => () => {
//         setOpen(true);
//         setOrder(order);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setOrder({});
//     };
//     const handleInsert = () => {
//         setShowOrderForm(true);
//     }

//     const handleOrderSubmit = async (values, { setSubmitting }) => {
//         // setIsLoading(true);
//         try {
//             console.log("hetre");
//             // Insert order logic here
//             console.log("Order values:", values);
//             fetchData();
//             setShowOrderForm(false);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setIsLoading(false);
//             setSubmitting(false);
//         }
//     };

//     const handleCloseForm = () => {
//         setShowOrderForm(false);
//     }
//     const columns = [
//         {
//             field: "_id",
//             headerName: "ID",
//             width: 400,
//             description: "ID of the product",
//         },
//         // {
//         //     field: "fullname",
//         //     headerName: "Full Name",
//         //     width: 400,
//         //     description: "Customer full name",
//         //     renderCell: (params) => (
//         //         <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
//         //             <Avatar
//         //                 alt="name"
//         //                 sx={{ width: 30, height: 30, backgroundColor: "black" }}
//         //             >
//         //                 {params.row.customer.firstname.charAt(0).toUpperCase()}
//         //             </Avatar>
//         //             <Typography variant="subtitle2" sx={{ mx: 3 }}>
//         //                 {`${params.row.customer.firstname || ""} ${params.row.customer.lastname || ""
//         //                     }`}
//         //             </Typography>
//         //         </div>
//         //     ),
//         // },
//         // {
//         //     field: "email",
//         //     headerName: "Email",
//         //     width: 300,
//         //     description: "Customer Email",
//         //     renderCell: (params) => params.row.customer.email || "",
//         // },
//         {
//             field: "totalAmount",
//             headerName: "Total Amount",
//             width: 200,
//             description: "Total amount of the order",
//         },
//         {
//             field: "date",
//             headerName: "Date",
//             width: 200,
//             description: "Date of the order",
//             renderCell: (params) => moment(params.row.date).format("YYYY-MM-DD"),
//         }
//         ,
//         {
//             field: "status",
//             headerName: "Status",
//             width: 200,
//             description: "Status of the order",
//             renderCell: (params) => (
//                 <Chip
//                     label={params.row.status}
//                     color={params.row.status === "approved" ? "success" : params.row.status === "rejected" ? "error" : "primary"}
//                 />
//             ),
//         },
//         {
//             field: "details",
//             headerName: "Order Details",
//             width: 300,
//             description: "The details of the order",
//             renderCell: (params) => {
//                 const order = params.row;
//                 return (
//                     <Button
//                         variant="contained"
//                         sx={{ bgcolor: "#504099" }}
//                         onClick={handleOrderDetail(order)}
//                         aria-label={`View details for order ${order.id}`}
//                     >
//                         Order Details
//                     </Button>
//                 );
//             },
//         },
//     ];

//     return (
//         <Box
//             sx={{
//                 margin: 3,
//                 bgcolor: "white",
//                 borderRadius: 2,
//                 padding: 3,
//                 height: "100%",
//             }}
//         >
//             <div style={{ display: "flex", justifyContent: "end" }}>

//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleInsert}
//                     style={{ marginBottom: "10px" }}
//                 >
//                     Make New Order
//                 </Button>
//             </div>
//             <MiniLoader isLoading={isLoading} size={50} color="#1976d2" />
//             <DataGrid
//                 sx={{
//                     borderLeft: 0,
//                     borderRight: 0,
//                     borderRadius: 0,
//                 }}
//                 rows={orders}
//                 columns={columns}
//                 getRowId={(row) => row._id}
//                 initialState={{
//                     pagination: {
//                         paginationModel: { page: 0, pageSize: 10 },
//                     },
//                 }}
//                 pageSizeOptions={[15, 20, 30]}
//                 rowSelection={false}
//             />
//             <Modal open={open} onClose={handleClose}>
//                 <Box>
//                     <CustomerOrderModal order={order} handleClose={handleClose} />
//                 </Box>
//             </Modal>
//             <Modal open={showOrderForm} onClose={handleCloseForm}>
//                 <Box>
//                     <AddOrderForm onClose={handleCloseForm} onSubmit={handleOrderSubmit} />
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default CustomerOrderList;
import { Avatar, Box, Button, Chip, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addOrder, getOrderByCustomerId } from "../../../redux/service/orderService";
import MiniLoader from "../../../common/Form/MiniLoader";
import moment from "moment/moment";
import CustomerOrderModal from "./CustomerModal";
import AddOrderForm from "./AddOrderForm";

const CustomerOrderList = () => {
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { userData } = useSelector((state) => state?.persist);
    const [orders, setOrders] = useState([]);
    const [showOrderForm, setShowOrderForm] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await getOrderByCustomerId(userData?.id);
            setOrders(response);
            console.log(response);
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

    const handleInsert = () => {
        setShowOrderForm(true);
    }

    const handleOrderSubmit = async (values, { setSubmitting }) => {
        try {
            const payload = {
                products : values.products,
                customer : userData?.id
            }
            const response = await addOrder(payload);
            // Insert order logic here
            await fetchData();
            setShowOrderForm(false);
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseForm = () => {
        setShowOrderForm(false);
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 400,
            description: "ID of the product",
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
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            description: "Status of the order",
            renderCell: (params) => (
                <Chip
                    label={params.row.status}
                    color={params.row.status === "approved" ? "success" : params.row.status === "rejected" ? "error" : "primary"}
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
                        aria-label={`View details for order ${order._id}`}
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
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInsert}
                    style={{ marginBottom: "10px" }}
                >
                    Make New Order
                </Button>
            </div>
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
                    <CustomerOrderModal order={order} handleClose={handleClose} />
                </Box>
            </Modal>
            <Modal open={showOrderForm} onClose={handleCloseForm}>
                <Box>
                    <AddOrderForm onClose={handleCloseForm} onSubmit={handleOrderSubmit} />
                </Box>
            </Modal>
        </Box>
    );
};

export default CustomerOrderList;
