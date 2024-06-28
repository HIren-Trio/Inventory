import Rest from "../config/Rest";
import { apiRoutes } from "../apiEndpoints";

export const registerData = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.register, payload);

    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

export const sentOTP = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.sentOtp, payload);
    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

export const registerVerifyAPIData = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.registerOtpVerify, payload);

    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

export const loginData = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.login, payload);

    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

export const resetPassword = async (payload) => {
  try {
    const { data } = await Rest.post(apiRoutes.passwordReset, payload);

    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

export const getUsername = async (payload) => {
  console.log(payload);
  try {
    const { data } = await Rest.post(apiRoutes.forgotUsername, payload);

    return data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};