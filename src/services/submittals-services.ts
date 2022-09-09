// import { SubmittalListResponse } from "models/submittal-log";
import { client } from "./axios";
import { BASE_URL, SUBMITTAL_LIST } from "./endpoints";
import { mockUpClient } from "./mock-server";

// Submittals of a Project
/* export const GetSubmittals = async (projectId: string) => {
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
}; */

export const GetSubmittals = async (projectId: string) => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${SUBMITTAL_LIST}`, {
    params: {
      projectId
    }
  });
  return response;
};
