import React from "react";
import { useField } from "formik";
import OTPInput from "otp-input-react";

function OTPField({ name, id, className }) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (otp) => {
    helpers.setValue(otp);
  };

  return (
    <div className={className}>
      <label
        htmlFor={id || name}
        className={`block text-sm font-semibold text-[#001e44]`}
      >
        Verify OTP
      </label>
      <OTPInput
        value={field.value}
        onChange={handleChange}
        autoFocus
        OTPLength={6}
        otpType="number"
        disabled={false}
        inputClassName={`intro-x form-control block border ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
        className={`intro-x mt-4 flex-1 justify-center lg:justify-between`}
        inputStyles={{ width: 40, height: 40, marginRight: 5 }}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
}

export default OTPField;