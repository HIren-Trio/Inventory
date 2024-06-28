import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "../../../common/Form/InputField";

const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    stock: Yup.number().required("Stock is required").integer("Stock must be an integer").positive("Stock must be positive"),
});

const UpdateProductForm = ({ initialValues, onSubmit, onClose }) => {
    console.log(initialValues);
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
            <Box sx={{ color: "black", display: "flex", flexDirection: "column", position: "relative" }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Product
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField

                                name="name"
                                label="Product Name"
                                placeholder="Enter product name"
                            />
                            <InputField

                                name="category"
                                label="Category"
                                placeholder="Enter product category"
                            />
                            <InputField

                                name="price"
                                type="number"
                                label="Price"
                                placeholder="Enter product price"
                            />
                            <InputField
                                name="stock"
                                type="number"
                                label="Stock"
                                placeholder="Enter stock quantity"
                            />
                            <InputField
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

export default UpdateProductForm;
