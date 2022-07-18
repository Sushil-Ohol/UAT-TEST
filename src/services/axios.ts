/* eslint-disable no-param-reassign */
/* This file helps to interact with server with interceptors */
import axios, { AxiosError } from "axios";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import { SuccessResult, ErrorResult } from "models/base";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/admin",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
});

export const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    // ignore the token reload request
    if (!config.url?.startsWith("/reloadtoken")) {
      const token = "";
      if (token) {
        config.headers = {
          ...config.headers,
          accessToken: token
        };
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const parseResponse = <T>(
  response: any
): SuccessResult<T> | ErrorResult => {
  const data = JSON.parse(response);
  if (data?.errors) {
    return {
      remote: "failure",
      error: {
        errors: data.errors
      }
    };
  }
  return {
    remote: "success",
    data,
    error: { errors: "" }
  };
};

const request = async <T>(
  config: AxiosAuthRefreshRequestConfig
): Promise<SuccessResult<T> | ErrorResult> => {
  try {
    const response = await axiosInstance.request<T>({
      ...config,
      transformResponse: (res) => {
        const resp = parseResponse<T>(res);
        return resp.remote === "success" ? resp.data : resp;
      }
    });
    return {
      remote: "success",
      data: response.data
    };
  } catch (error: any) {
    if (error.message !== "request cancellation") {
      /* message.warn(
        error.response.data.Error
          ? error.response.data.Error
          : error.response.data.message
      ); */
      return {
        remote: "failure",
        error: {
          errors: error.response.data.Error
            ? error.response.data.Error
            : error.response.data.message
        }
      };
    }
    if (error) {
      if (error.response) {
        const axiosError = error as any; // AxiosError<ServerError>
        if (axiosError.response?.data) {
          let errorMessage = axiosError.response.data.errors;
          // message.error(errorMessage);
          // check for 500 to handle message defined by the app
          if (axiosError.response.status === 500) {
            errorMessage = "Internal Server Error!";
          } else if (axiosError.response.status === 401) {
            errorMessage = "Login Expired!";
          } else {
            errorMessage = error.response.data.Error;
          }
          return {
            remote: "failure",
            error: {
              status: axiosError.response.status,
              errors: errorMessage
            }
          };
        }
        return {
          remote: "failure",
          error: {
            errors: error.response.data.message
          }
        };
      }
      const axiosError = error as AxiosError;
      let errorMessage = axiosError.message;
      // message.error(errorMessage);
      if (errorMessage === "Network Error") {
        errorMessage = "Sorry ! No Internet Connection";
      }
      return {
        remote: "failure",
        error: {
          errors: errorMessage
        }
      };
    }
    throw error;
  }
};

const axiosContainer = { request };

export default axiosContainer;
