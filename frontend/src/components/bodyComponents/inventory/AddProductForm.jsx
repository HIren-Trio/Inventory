import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Container, Typography, Box, IconButton } from "@mui/material";
import InputField from "../../../common/Form/InputField";
import CloseIcon from "@mui/icons-material/Close";
const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    stock: Yup.number().required("Stock is required").integer("Stock must be an integer").positive("Stock must be positive"),
});

const AddProductForm = ({ onSubmit, onClose }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "30%",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
            }}
        >
            <Box sx={{ color: "black", display: "flex", flexDirection: "column" }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Product
                </Typography>
                <Formik
                    initialValues={{ name: "", category: "", price: "", stock: "", description:"" }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                component={InputField}
                                name="name"
                                label="Product Name"
                                placeholder="Enter product name"
                            />
                            <InputField
                                component={InputField}
                                name="category"
                                label="Category"
                                placeholder="Enter product category"
                            />
                            <InputField
                                component={InputField}
                                name="price"
                                type="number"
                                label="Price"
                                placeholder="Enter product price"
                            />
                            <InputField
                                component={InputField}
                                name="stock"
                                type="number"
                                label="Stock"
                                placeholder="Enter stock quantity"
                            />
                            <InputField
                                component={InputField}
                                name="description"
                                type="text"
                                label="Description"
                                placeholder="Enter product description"
                            />
                            <Box mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>

    );
};

export default AddProductForm;
