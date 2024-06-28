
import { apiRoutes } from "../apiEndpoints";
import Rest from "../config/Rest";
export const getAllCustomer = async (payload) => {
  try {
    const { data } = await Rest.get(apiRoutes.getallcustomer + payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export const addCustomer = async (req, res) => {
  try {
    const { data } = await Rest.post(apiRoutes.addCustomer, req);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}



export const loginCustomer = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.customerlogin, payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}