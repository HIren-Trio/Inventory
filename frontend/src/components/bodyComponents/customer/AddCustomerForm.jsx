import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Container, Typography, Box, IconButton } from "@mui/material";
import InputField from "../../../common/Form/InputField";
import CloseIcon from "@mui/icons-material/Close";
const validationSchema = Yup.object({
    firstname: Yup.string().required("Customer firstname is required"),
    lastname: Yup.string().required("Customer lastname is required"),
    email: Yup.string().email("Invalid email address").required("Customer email is required"),
    password:
        Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    confirmpassword:
        Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),

});

const AddCustomerForm = ({ onSubmit, onClose }) => {
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
                    initialValues={{ firstname: "", lastname: "", email: "", password: "", confirmpassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>

                            <InputField
                                name="firstname"
                                label="First Name"
                                placeholder="Enter First name"
                            />
                            <InputField
                                name="lastname"
                                label="Last Name"
                                placeholder="Enter Last name"
                            />
                            <InputField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Enter Email"
                            />
                            <InputField
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter Password"
                            />
                            <InputField
                                name="confirmpassword"
                                type="password"
                                label="Confirm Password"
                                placeholder="Enter Confirm Password"
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

export default AddCustomerForm;
