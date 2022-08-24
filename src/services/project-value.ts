import { ProjectValueResponse } from "models/project-value";
import api from "./axios";
import { BASE_URL, PROJECT_VALUE_V1 } from "./endpoints";

// Project value  of a Project
export const GetProjectValue = async () => {
  const response = await api.request<ProjectValueResponse>({
    url: `${BASE_URL}/${PROJECT_VALUE_V1}`,
    method: "GET"
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data,
      error: { errors: "" }
    };
  }
  return response;
};
