import { ProjectSuggestResponse } from "models/project-suggest";
import api from "./axios";
import { BASE_URL, PROJECT_SUG } from "./endpoints";

// Project suggest  of a Project
export const GetProjectSuggest = async () => {
  const response = await api.request<ProjectSuggestResponse>({
    url: `${BASE_URL}/${PROJECT_SUG}`,
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
