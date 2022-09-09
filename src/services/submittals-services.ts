import { client } from "./axios";
import { BASE_URL, SUBMITTAL_LIST } from "./endpoints";
import { mockUpClient } from "./mock-server";

export const GetSubmittals = async (projectId: string) => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${SUBMITTAL_LIST}`, {
    params: {
      projectId
    }
  });
  return response;
};
