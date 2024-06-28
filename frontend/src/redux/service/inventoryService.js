
import { apiRoutes } from "../apiEndpoints";
import Rest from "../config/Rest";
export const getAllInventory = async (payload) => {
  try {
    const { data } = await Rest.get(apiRoutes.getallinventory + payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export const addInventory = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.addInventory, payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    }
  }
}
export const updateInventory = async (id, payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.updateInventory + id, payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    }
  }
}




export const deleteInventory = async (payload) => {
  try {
    const { data } = await Rest.delete(apiRoutes.deleteInventory + payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    }
  }
}


