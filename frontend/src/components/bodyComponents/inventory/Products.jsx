// import { Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Product from "./Product";
// import { DataGrid } from "@mui/x-data-grid";
// import { getAllInventory } from "../../../redux/service/inventoryService";
// import { useSelector } from "react-redux";
// import MiniLoader from "../../../common/Form/MiniLoader";
// export default function Products() {
//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       width: 90,
//       description: "id of the product",
//     },
//     {
//       field: "product",
//       headerName: "Product",
//       width: 400,
//       description: "",

//       renderCell: (cellData) => {
//         console.log("the cell data is : ", cellData.row.name);
//         return <Product productName={cellData.row.name} />;
//       },
//     },
//     {
//       field: "category",
//       headerName: "Category",
//       width: 200,
//       description: "category of the product",
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       width: 150,
//       description: "price of the product",
//       valueGetter: (params) => "$" + params,
//     },
//     {
//       field: "stock",
//       headerName: "Stock",
//       width: 200,
//       description: "how many items in the stock",
//       valueGetter: (params) => params + " pcs",
//     },
//   ];
//   const [isLoading, setIsLoading] = useState(false);
//   const { userData } = useSelector((state) => state?.persist);
//   const [productList, setProductList] = useState([]);
//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getAllInventory(userData?.id);
//       setProductList(response);
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

//   return (
//     <div>
//       <MiniLoader isLoading={isLoading} size={50} color="#1976d2" />
//       <DataGrid
//         sx={{ borderLeft: 0, borderRight: 0, borderRadius: 0 }}
//         rows={productList}
//         columns={columns}
//         getRowId={(row) => row._id}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 10 },
//           },
//         }}
//         pageSizeOptions={[5, 10, 20]}
//         checkboxSelection
//       />
//     </div>
//   );
// }
import { Typography, Button, Modal, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { DataGrid } from "@mui/x-data-grid";
import { addInventory, deleteInventory, getAllInventory, updateInventory } from "../../../redux/service/inventoryService";
import { useSelector } from "react-redux";
import MiniLoader from "../../../common/Form/MiniLoader";
import AddProductForm from "./AddProductForm";
import UpdateProductForm from "./UpdateProductForm";

export default function Products() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.between("sm", "md"));
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: isMobile ? 50 : isTablet ? 70 : 90,
      description: "ID of the product",
    },
    {
      field: "product",
      headerName: "Product",
      width: isMobile ? 150 : isTablet ? 300 : 400,
      description: "",
      renderCell: (cellData) => {
        console.log("The cell data is: ", cellData.row.name);
        return <Product productName={cellData.row.name} />;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: isMobile ? 100 : isTablet ? 150 : 200,
      description: "Category of the product",
    },
    {
      field: "price",
      headerName: "Price",
      width: isMobile ? 80 : isTablet ? 120 : 150,
      description: "Price of the product",
      valueGetter: (params) => "$" + params,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: isMobile ? 100 : isTablet ? 150 : 200,
      description: "Number of items in stock",
      valueGetter: (params) => params + " pcs",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 200 : isTablet ? 250 : 300,
      renderCell: (cellData) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick(cellData.row)}
            size={isMobile ? "small" : "medium"}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(cellData.row._id)}
            size={isMobile ? "small" : "medium"}
            style={{ marginLeft: 10 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];


  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useSelector((state) => state?.persist);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllInventory(userData?.id);
      setProductList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsert = () => {
    setShowAddForm(true);
  };
  const handleClose = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
  }


  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      if (window.confirm("Are you sure delete this Product ? ")) {
        console.log(id);
        const response = await deleteInventory(id);
        alert(response?.message);
        // Delete logic here
        console.log(`Deleted product with id: ${id}`);
        // Refresh the product list
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const id = selectedProduct._id;
      const payload = {
        name: values?.name,
        category: values?.category,
        price: values?.price,
        stock: values?.stock,
        description: values?.description,
      }
      console.log({ id, payload });
      const response = await updateInventory(id, payload);
      alert(response?.message);
      console.log("Updated values:", values);
      // Refresh the product list
      fetchData();
      setShowUpdateForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleFormSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const payload = {
        userId: userData?.id,
        name: values?.name,
        category: values?.category,
        price: values?.price,
        stock: values?.stock,
        description: values?.description,
      }
      // Insert product logic here
      console.log("Form values:", payload);
      const response = await addInventory(payload);
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
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>

        <Button
          variant="contained"
          color="primary"
          onClick={handleInsert}
          style={{ marginBottom: "10px" }}
        >
          Insert New Product
        </Button>
      </div>
      <MiniLoader isLoading={isLoading} size={50} color="#1976d2" />
      {!isLoading && <DataGrid
        sx={{ borderLeft: 0, borderRight: 0, borderRadius: 0 }}
        rows={productList}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}

      />}
      <Modal open={showAddForm}>
        <AddProductForm onSubmit={handleFormSubmit} onClose={handleClose} />
      </Modal>

      <Modal open={showUpdateForm}>
        <UpdateProductForm
          initialValues={selectedProduct}
          onSubmit={handleUpdateSubmit}
          onClose={handleClose}
        />
      </Modal>
    </div>
  );
}
