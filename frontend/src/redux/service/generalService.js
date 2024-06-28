import { apiRoutes } from "../apiEndpoints";
import Rest from "../config/Rest";

export const getAllNotification = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.getAllNotification + payload);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
}