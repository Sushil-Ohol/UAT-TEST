import { ProjectListResponse } from "models/project";
import api from "./axios";
import { BASE_URL, PROJECT_LIST } from "./endpoints";

// Submittals of a Project
export const GetProjects = async (pageIndex: number) => {
  const response = await api.request<ProjectListResponse>({
    url: `${BASE_URL}/${PROJECT_LIST}?pageIndex=${pageIndex}`,
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
