import React, { useEffect, useState } from "react";

import Select from "react-select";
import { countryCodes } from "./countryCodes";
import { decode } from "html-entities";
import { Field } from "formik";

const MobileField = ({
  label,
  extraLabel,
  isRequiredField,
  labelRightContent,
  countryCodeValue,
  touched,
  error,
  defaultCountryCode,
  onChangeCountryCode,
  onChange,
  ...props
}) => {
  const [countryCode, setCountryCode] = useState();
  const [mobileNumber, setMobileNumber] = useState();

  useEffect(() => {
    setCountryCode(countryCodeValue);
  }, [countryCodeValue]);

  const onChangeCountryCodeInput = (e) => {
    setCountryCode(e);
    onChangeCountryCode(e?.value);
    onChange(mobileNumber);
  };

  return (
    <div className="mb-4">
      {label && (
        <div className="form-label flex justify-between">
          <label className="block text-sm font-semibold text-[#001e44]">
            {label} {extraLabel}{" "}
            {isRequiredField && <span className="text-danger">*</span>}
          </label>
          {labelRightContent}
        </div>
      )}

      <div className="relative ">
        <div
          className="absolute inset-y-2 left-0 flex items-center z-[9999] rounded-lg"
          style={{ width: 100 }}
        >
          <label htmlFor="countryCode" className="sr-only">
            Code
          </label>
          <Select
            // menuPortalTarget={document.body}
            isDisabled={props.readOnly}
            value={countryCode}
            styles={{
              input: (styles) => ({
                ...styles,
                border: "none",
                ":active": {
                  ...styles[":active"],
                  outline: "none",
                },
                ":focus": {
                  ...styles[":focus"],
                  borderColor: "transparent !important",
                  border: "none !important",
                },
                width: "70px",
                marginLeft: "0px",
                marginRight: "0px",
                margin: "0px",
              }),
              control: (styles, { isDisabled }) => ({
                ...styles,
                border: "none",
                padding: "0px",
                margin: "0px",
                marginLeft: "1px",
                marginRight: "0px",
                fontSize: "13px",
                boxShadow: "none",
                color: "#384252",
                // backgroundColor: mode === "dark" ? "#1b253b" : "white",
                // backgroundColor: mode === "dark" ? (isDisabled ? "#202a41" : "#1b253b") : isDisabled ? "#f1f5f9" : "white",
                backgroundColor: "transparent",
                borderRadius: 15,
              }),
              singleValue: (styles, { data }) => ({
                ...styles,
                color: "#384252",
              }),
              indicatorSeparator: () => null,
              menu: (styles) => ({
                ...styles,
                width: "130px",
                backgroundColor: "white",
              }),
              menuPortal: (base) => ({ ...base, zIndex: 999 }),
              dropdownIndicator: () => null,
            }}
            options={countryCodes}
            {...props}
            onChange={onChangeCountryCodeInput}
            getOptionLabel={(e) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginLeft: 5 }}>
                  <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                </span>
              </div>
            )}
          />
        </div>
        <Field name={props.name}>
          {({ field, form, meta }) => (
            <>
              <input
                maxLength="12"
                type="number"
                style={{ paddingLeft: 108 }}
                className={`intro-x w-full border rounded-md login__input form-control py-2 px-3 block ${
                  touched && error ? "border-red-500" : ""
                }`}
                placeholder={
                  props.placeholder ? props.placeholder : "123 456 789"
                }
                readOnly={props.readOnly}
                {...props}
                {...field}
                onPaste={(e) => {
                  if (props?.type === "number") {
                    const str = e.clipboardData.getData("Text");
                    const re = /^[0-9]*[.]?[0-9]*$/;
                    if (!re.test(str)) {
                      e.preventDefault();
                    }
                  }
                }}
              />
            </>
          )}
        </Field>
      </div>
      {touched && touched && (
        <p className="text-red-500 mt-2 ml-1 text-[12px]">{error}</p>
      )}
    </div>
  );
};

export default MobileField;