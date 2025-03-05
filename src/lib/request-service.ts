import { AxiosResponse } from "axios";
import { HTTP_METHODS } from "../constants/constants";
import { axiosProtected } from "./axios-interceptor";

interface RequestData {
    params?: Record<string, any>;
    [key: string]: any;
}

interface ApiResponse {
    [key: string]: any;
}

export const sendRequest = async (
    method: HTTP_METHODS,
    path: string,
    requestData: RequestData = {},
    contentType: string = 'application/json',
    params: Record<string, any> = {}
): Promise<ApiResponse | { error: string }> => {
    try {
        const BASE_URL = process.env.REACT_APP_IP;
        const config = {
            method: method,
            headers: {
                'Content-Type': contentType,
            },
            data: requestData,
            params: requestData?.params || params,
        };

        const response: AxiosResponse = await axiosProtected(`${BASE_URL}${path}`, config);

        if (response?.data) {
            return response.data;
        } else {
            return { error: response?.data?.message || 'Unknown error occurred' };
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
