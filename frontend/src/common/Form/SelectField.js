import React from "react";
import { useField } from "formik";

const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-semibold text-[#001e44]"
      >
        {label}
      </label>
      <div className="relative">
        <select
          {...field}
          {...props}
          className={`w-full py-2 px-4 border rounded mt-2 focus:outline-none focus:border-[#001e44] ${
            meta.touched && meta.error ? "border-red-500" : ""
          }`}
        >
          <option value="" label="Select an option" defaultValue="" hidden  />
          {options.map((option) => (
            <option key={option.value} value={option.value} label={option.label} />
          ))}
        </select>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 mt-2 ml-1 text-[12px]">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectField;
