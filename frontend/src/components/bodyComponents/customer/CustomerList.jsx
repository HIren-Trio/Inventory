import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MiniLoader from "../../../common/Form/MiniLoader";
import { addCustomer, getAllCustomer } from "../../../redux/service/customerService";
import { useSelector } from "react-redux";
import AddCustomerForm from "./AddCustomerForm";
const CustomerList = () => {
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 500,
      description: "id of the product",
    },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 500,
      description: "customer full name",
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: "100% " }}>
            <Avatar
              alt="name"
              variant="square"
              sx={{ borderRadius: 1, width: 30, height: 30 }}
            >
              {params.row.firstname.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="subtitle2" sx={{ mx: 3 }}>
              {`${params.row.firstname || ""} ${params.row.lastname || ""} `}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      description: "email of customer",
    }
  ];
  const [rows, setRows] = useState([]);

  const { userData } = useSelector((state) => state?.persist);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCustomer(userData?.id);
      console.log(response);
      setRows(response);
    }
    catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();

  }, [])
  const [showAddForm, setShowAddForm] = useState(false);
  const handleInsert = () => {
    setShowAddForm(true);
  };
  const handleFormSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const payload = {
        userId: userData?.id,
        firstname: values?.firstname,
        lastname: values?.lastname,
        email: values?.email,
        password :  values?.password, 
      }
      // Insert product logic here
      console.log("Form values:", payload);
      const response = await addCustomer(payload);
      alert(response?.message);
      // Refresh the product list
      fetchData();
      setShowAddForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowAddForm(false);
  }

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
          Insert New Customer
        </Button>
      </div>
      <MiniLoader isLoading={isLoading} size={50} color="#1976d2" />
      <DataGrid
        sx={{
          borderLeft: 0,
          borderRight: 0,
          borderRadius: 0,
        }}
        rows={rows}
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
      <Modal open={showAddForm}>
        <AddCustomerForm onSubmit={handleFormSubmit} onClose={handleClose} />
      </Modal>

    </Box>
  );
}

export default CustomerList;