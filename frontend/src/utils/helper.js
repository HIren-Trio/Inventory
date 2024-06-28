// import { toast } from "react-toastify";

// export const validationMessage = (message) => {
//   if (typeof message === "object") {
//     let customMessage = "";
//     Object.keys(message)?.map((key) => {
//       message?.[key]?.map((item) => {
//         if (customMessage) {
//           customMessage += ` ${item}`;
//         } else {
//           customMessage += item;
//         }
//       });
//     });

//     return customMessage;
//   } else {
//     return message;
//   }
// };

// export const showToastMessage = (text, responseCode, options) => {
//   const type =
//     responseCode === 200
//       ? "success"
//       : responseCode === "info"
//       ? "info"
//       : "error";

//   const toastAlert = toast?.[type || "success"];

//   toastAlert(text, {
//     ...options,
//   });
// };
import { toast } from "react-toastify";

export const validationMessage = (message) => {
  if (typeof message === "object") {
    return Object.keys(message).reduce((customMessage, key) => {
      message[key].forEach((item) => {
        customMessage += ` ${item}`;
      });
      return customMessage.trim();
    }, "");
  } else {
    return message;
  }
};

export const showToastMessage = (text, responseCode, options) => {
  console.log(text);
  const type =
    responseCode === 200
      ? "success"
      : responseCode === "info"
        ? "info"
        : "error";

  const toastAlert = toast[type] || toast.success;

  toastAlert(text, {
    ...options,
  });
};
