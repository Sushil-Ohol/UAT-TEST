import { SubmittalListResponse } from "models/submittal-log";
import api from "./axios";
import { BASE_URL, SUBMITTAL_LIST } from "./endpoints";

// Submittals of a Project
export const GetSubmittals = async (projectId: string) => {
  const response = await api.request<SubmittalListResponse>({
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
