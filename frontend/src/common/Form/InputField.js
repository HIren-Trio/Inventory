import React, { useState } from "react";
import { useField } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({ label, type, placeholder, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-semibold text-[#001e44]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          {...props}
          placeholder={placeholder}
          type={inputType}
          className={`w-full py-2 px-4 border rounded mt-2 focus:outline-none focus:border-[#001e44] ${
            meta.touched && meta.error ? "border-red-500" : ""
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 pt-3 flex items-center focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 mt-2 ml-1 text-[12px]">{meta.error}</div>
      )}
    </div>
  );
};

export default InputField;