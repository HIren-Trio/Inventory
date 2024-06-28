import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
// import { loginData } from "../../redux/service/authService";
import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../redux/action/authAction";
import LoginImage from "../../../images/Main.jpg";
import { LoginSchema } from "../../../common/Form/ValidationSchema";
import InputField from "../../../common/Form/InputField";
import MiniLoader from "../../../common/Form/MiniLoader";

import { loginCustomer } from "../../../redux/service/customerService";
import { loginSuccess } from "../../../redux/action/authAction";
import AuthenticationContainer from "../../AuthenticationContainer/AuthenticationContainer";

const LoginCustomer = () => {
      const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async (values) => {
        setIsLoading(true);
        const data = await loginCustomer(values);

        if (data?.token) {
          dispatch(loginSuccess(data));
          
          navigate("/customer"); 
        }
        setIsLoading(false);
    };
    const initialValues = {
        email: "",
        password: "",
    };
    return (
        <AuthenticationContainer mobileViewImage={LoginImage}>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({
                    handleSubmit,
                    errors,
                    values,
                    setFieldValue,
                    touched,
                    isValid,
                }) => {
                    return (
                        <Form className="w-full max-w-md">
                            <div className="w-full max-w-md">
                                <h2 className="flex text-2xl font-bold mb-4">{"Customer  Login"}</h2>

                                <InputField label="email" name="email" />

                                <InputField label="Password" name="password" type="password" />

                                <p className="mt-2">
                                    <Link
                                        to="/forgotpassword"
                                        className="inline-block align-baseline ml-2 text-sm text-[#270685]"
                                        style={{ color: '#270685' }}
                                    >
                                        Forget Password?
                                    </Link>
                                   
                                </p>
                                <p className="mt-4 ml-2 text-sm">
                                    Don't have an account?{" "}
                                    <Link to="/signup" style={{ color: '#270685 ', marginLeft: '4px' }}>
                                        Create one
                                    </Link>
                                </p>
                                <div className="flex items-center justify-center md:justify-start mt-4">
                                    <button
                                        onClick={handleSubmit}
                                        style={{
                                            background: "#1976d2", color: 'white'
                                        }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="font-semibold w-full text-white py-2 px-6 rounded-md focus:outline-none focus:shadow-outline-blue"
                                    >
                                        {"Login"} <MiniLoader isLoading={isLoading} />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </AuthenticationContainer>
    );
};

export default LoginCustomer;