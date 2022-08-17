import api from "./axios";
import { BASE_URL, SUBMITTAL_LIST } from "./endpoints";

// Submittals of a Project
export const GetSubmittals = async (projectId: string) => {
  console.log(projectId);
  const response = await api.request<any>({
    url: `${BASE_URL}/${SUBMITTAL_LIST}?projectId=${projectId}`,
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
