// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, FieldArray } from "formik";
// import * as Yup from "yup";
// import { Button, Box, IconButton, Typography } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import InputField from "../../../common/Form/InputField";
// import { getAllInventory } from "../../../redux/service/inventoryService";
// import { useSelector } from "react-redux";
// import SelectField from "../../../common/Form/SelectField";

// const validationSchema = Yup.object({
//     customerName: Yup.string().required("Customer name is required"),
//     products: Yup.array().of(
//         Yup.object().shape({
//             productId: Yup.string().required("Product ID is required"),
//             quantity: Yup.number().required("Quantity is required").positive("Quantity must be positive").integer("Quantity must be an integer"),
//         })
//     ).required("Must have products").min(1, "Minimum of 1 product"),
// });

// const AddOrderForm = ({ onSubmit, onClose }) => {

//     const [productList, setProductList] = useState([]);
//     const { userData } = useSelector((state) => state?.persist);

//     const fetchData = async () => {
//         try {
//             const response = await getAllInventory(userData?.userId);
//             const options = response.map((p) => { return { label: p.name, value: p._id } });
//             console.log(options);
//             setProductList(options);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(()=>{
//         fetchData();
//     },[])
//     return (
//         <Box
//             sx={{
//                 position: "absolute",
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "40%",
//                 bgcolor: "white",
//                 borderRadius: 2,
//                 boxShadow: 24,
//                 p: 4,
//             }}
//         >
//             <Box sx={{ color: "black", display: "flex", flexDirection: "column", position: "relative" }}>
//                 <IconButton
//                     onClick={onClose}
//                     sx={{ position: "absolute", top: 8, right: 8 }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Add New Order
//                 </Typography>
//                 <Formik
//                     initialValues={{ customerName: "", products: [{ productId: "", quantity: 1 }] }}
//                     validationSchema={validationSchema}
//                     onSubmit={onSubmit}
//                 >
//                     {({ isSubmitting, values }) => (
//                         <Form>

//                             <FieldArray name="products">
//                                 {({ push, remove }) => (
//                                     <div>
//                                         {values.products.map((product, index) => (
//                                             <Box key={index} display="flex" alignItems="center">

//                                                 <div style={{ marginRight: 8 }}>


//                                                     <SelectField
//                                                         name={`products.${index}.productId`}
//                                                         label="Product ID"
//                                                         placeholder="Enter product ID"
//                                                         options={productList}
//                                                     />
//                                                 </div>
//                                                 <div style={{ marginRight: 8 }}>
//                                                     <InputField

//                                                         name={`products.${index}.quantity`}
//                                                         type="number"
//                                                         label="Quantity"
//                                                         placeholder="Enter quantity"
//                                                         style={{ marginRight: 8 }}
//                                                     />
//                                                 </div>
//                                                 <IconButton
//                                                     onClick={() => remove(index)}
//                                                     disabled={values.products.length === 1}
//                                                     sx={{ marginTop: 2 }}
//                                                 >
//                                                     <CloseIcon />
//                                                 </IconButton>
//                                             </Box>
//                                         ))}
//                                         <Button
//                                             type="button"
//                                             onClick={() => push({ productId: "", quantity: 1 })}
//                                             sx={{ marginTop: 2 }}
//                                         >
//                                             Add Another Product
//                                         </Button>
//                                     </div>
//                                 )}
//                             </FieldArray>
//                             <Box mt={2}>
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? "Submitting..." : "Submit"}
//                                 </Button>
//                             </Box>
//                         </Form>
//                     )}
//                 </Formik>
//             </Box>
//         </Box>
//     );
// };

// export default AddOrderForm;
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "../../../common/Form/InputField";
import { getAllInventory } from "../../../redux/service/inventoryService";
import { useSelector } from "react-redux";
import SelectField from "../../../common/Form/SelectField";

// Define validation schema using Yup
const validationSchema = Yup.object({
    products: Yup.array().of(
        Yup.object().shape({
            product: Yup.string().required("Product ID is required"),
            quantity: Yup.number().required("Quantity is required").positive("Quantity must be positive").integer("Quantity must be an integer"),
        })
    ).required("Must have products").min(1, "Minimum of 1 product"),
});

const AddOrderForm = ({ onSubmit, onClose }) => {
    const [productList, setProductList] = useState([]);
    const { userData } = useSelector((state) => state?.persist);

    // Fetch data for product list
    const fetchData = async () => {
        try {
            const response = await getAllInventory(userData?.userId);
            const options = response.map((p) => ({ label: p.name, value: p._id }));
            setProductList(options);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "40%",
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
                    Add New Order
                </Typography>
                <Formik
                    initialValues={{ products: [{ product: "", quantity: 1 }] }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <FieldArray name="products">
                                {({ push, remove }) => (
                                    <div>
                                        {values.products.map((product, index) => (
                                            <Box key={index} display="flex" alignItems="center">
                                                <div style={{ marginRight: 8 }}>
                                                    <SelectField
                                                        name={`products.${index}.product`}
                                                        label="Product"
                                                        placeholder="Enter product"
                                                        options={productList}
                                                    />
                                                </div>
                                                <div style={{ marginRight: 8 }}>
                                                    <InputField
                                                        name={`products.${index}.quantity`}
                                                        type="number"
                                                        label="Quantity"
                                                        placeholder="Enter quantity"
                                                        style={{ marginRight: 8 }}
                                                    />
                                                </div>
                                                <IconButton
                                                    onClick={() => remove(index)}
                                                    disabled={values.products.length === 1}
                                                    sx={{ marginTop: 2 }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <Button
                                            type="button"
                                            onClick={() => push({ productId: "", quantity: 1 })}
                                            sx={{ marginTop: 2 }}
                                        >
                                            Add Another Product
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>
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

export default AddOrderForm;
