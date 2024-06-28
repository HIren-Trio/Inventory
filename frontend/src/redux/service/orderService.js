import { apiRoutes } from "../apiEndpoints";
import Rest from "../config/Rest";
export const getAllOrder = async (payload) => {
  try {
    const { data } = await Rest.get(apiRoutes.getallOrder + payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export const getOrderByCustomerId = async (id) => {
  try {
    const { data } = await Rest.get(apiRoutes.getallOrderByCustomerId + id);

    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export const addOrder = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.addOrder, payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export const deleteProductFromOrder = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.deleteproductfromorder + payload.id, { productId: payload.productId });
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}


export const changeStatusById = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.changestatus + payload.id,
      {
        status: payload.status
      }
    );
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

