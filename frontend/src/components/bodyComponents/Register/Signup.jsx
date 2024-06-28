import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import SignupImage from "../../../images/Main.jpg";
import AuthenticationContainer from "../../../common/components/AuthenticationContainer/AuthenticationContainer";
import { SignupSchema } from "../../../common/Form/ValidationSchema";
import InputField from "../../../common/Form/InputField";
import { registerData } from "../../../redux/service/authService";
// import { registerData, sentOTP } from "../../redux/service/authService";

const initialValues = {
  username: "",
  email:"",
  password :""
};

const Signup = () => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignup = async (values) => {
    if (termsAccepted) {
      const data = await registerData(values);

      if (data?.success) {
       navigate("/login");

     }
    } else {
      // Show an error or prompt user to accept terms
      alert("Please accept terms and conditions");
    }
  };

  return (
    <AuthenticationContainer
      mobileViewImage={SignupImage}
      // title="Sign Up"
      // initialValues={}
      // validationSchema={SignupSchema}
      // handleSubmit={handleSignup}
      // submitButtonName="Sign Up"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
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
              <h2 className="flex text-2xl font-bold mb-4">{"Sign Up"}</h2>
              <InputField label="Username" name="username" type="text" />
              <InputField label="email" name="email" type="email" />
              <InputField label="Password" name="password" type="password" />
              <div className=" flex items-center my-2">
                <Field
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="terms" className="ml-2 text-sm" style={{ marginLeft: '8px' }}>
                  I accept the terms and conditions
                </label>
              </div>
              <p className="my-4 ml-1 text-sm">
                Already have an account?{" "}
                <Link to="/login" style={{ color: '#270685 ', marginLeft: '4px' }}>
                  Login here
                </Link>
              </p>
              <div className="flex items-center justify-center md:justify-start mt-4">
                <button
                  onClick={handleSubmit}
                  style={{
                    background: "#1976d2",
                    color:'white'
                  }}
                  type="submit"
                  className="font-semibold w-full py-2 px-6 rounded-md focus:outline-none focus:shadow-outline-blue"
                >
                  {"Register"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* */}
    </AuthenticationContainer>
  );
};

export default Signup;