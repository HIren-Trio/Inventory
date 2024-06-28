// import axios from "axios";
// import { store } from "../Store";
// import { showToastMessage, validationMessage } from "../../utils/helper";
// // import { showToastMessage, validationMessage } from "../../utils/helper";

// axios.defaults.timeout = 1000 * 60;
// axios.defaults.headers = {
//   Pragma: "no-cache",
//   Accept: "application/json",
// };

// export default class Rest {
//   static async get(url) {
//     const { userData } = store.getState()?.persist;
//     const token = userData?.token;

//     const instance = axios.create({
//       baseURL: process.env.REACT_APP_API_URL,
//       headers: { authorization: `Bearer ${token}` },
//     });

//     return await instance
//       .get(url)
//       .then((res) => {
//         return res;
//       })
//       .catch((error) => {
//         return error;
//       });
//   }

//   static async post(
//     url,
//     payload = {},
//     formData = false,
//     headers = {},
//     loginToken = null
//   ) {
//     const { userData } = store.getState()?.persist;
//     const token = loginToken || userData?.token;
//     const instance = axios.create({
//       baseURL: process.env.REACT_APP_API_URL,
//       headers: {
//         authorization: `Bearer ${token}`,
//         "Content-Type": formData ? "multipart/form-data" : "application/json",
//         ...headers,
//       },
//     });

//     return await instance
//       .post(url, payload)
//       .then((res) => {
//         showToastMessage(res?.message,res?.status);
//         return res;
//       })
//       .catch((error) => {
//         showToastMessage(validationMessage(error?.response?.data?.data));
//         return error;
//       });
//   }

//   static async getDetails(url, payload) {
//     const instance = axios.create({
//       baseURL: process.env.REACT_APP_API_URL,
//       headers: {
//         authorization: `Bearer ${payload}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return await instance
//       .get(url)
//       .then((res) => {
//         return res;
//       })
//       .catch((error) => {
//         return error;
//       });
//   }
// }
import axios from "axios";
import { store } from "../Store";
import { showToastMessage, validationMessage } from "../../utils/helper";

axios.defaults.timeout = 1000 * 60;
axios.defaults.headers = {
  Pragma: "no-cache",
  Accept: "application/json",
};

export default class Rest {
  static async get(url) {
    const { userData } = store.getState()?.persist;
    const token = userData?.token;
    console.log(token);
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: { authorization: `Bearer ${token}` },
    });

    try {
      const res = await instance.get(url);
      showToastMessage(res?.data?.message, res?.status);
      return res;
    } catch (error) {
      showToastMessage(validationMessage(error?.response?.data?.data), "error");
      return error;
    }
  }

  static async post(
    url,
    payload = {},
    formData = false,
    headers = {},
    loginToken = null
  ) {
    const { userData } = store.getState()?.persist;
    const token = loginToken || userData?.token;
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        ...headers,
      },
    });

    try {
      const res = await instance.post(url, payload);
      showToastMessage(res?.data?.message, res?.status);
      return res;
    } catch (error) {
      showToastMessage(validationMessage(error?.response?.data?.data), "error");
      return error;
    }
  }
  static async put(
    url,
    payload = {},
    formData = false,
    headers = {},
    loginToken = null
  ) {
    const { userData } = store.getState()?.persist;
    const token = loginToken || userData?.token;
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        ...headers,
      },
    });
    try {
      const res = await instance.put(url, payload);
      
      showToastMessage(res?.data?.message, res?.status);
      return res;
    } catch (error) {
      showToastMessage(validationMessage(error?.response?.data?.data), "error");
      return error;
    }
  }
  static async delete(
    url,
    payload = {},
    formData = false,
    headers = {},
    loginToken = null
  ) {
    const { userData } = store.getState()?.persist;
    const token = loginToken || userData?.token;
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        ...headers,
      },
    });
    try {
      const res = await instance.delete(url, { data: payload });
      showToastMessage(res?.data?.message || "Request successful", res?.status);
      return res;
    } catch (error) {
      showToastMessage(validationMessage(error?.response?.data?.data), "error");
      return error;
    }
  }

  static async getDetails(url, token) {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    try {
      const res = await instance.get(url);
      return res;
    } catch (error) {
      showToastMessage(validationMessage(error?.response?.data?.data), "error");
      return error;
    }
  }


}
