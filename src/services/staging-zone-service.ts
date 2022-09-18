import { client } from "./axios";
import { BASE_URL, CONVERSATION_LIST, CONVERSATION_DETAILS } from "./endpoints";
import { mockUpClient } from "./mock-server";

// Get Conversations List
export const GetDiscussions = async () => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${CONVERSATION_LIST}`);
  return response;
};

// Get Discussion Details of a Topic
export const GetDiscussionDetails = async (topicId: string) => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${CONVERSATION_DETAILS}`, {
    params: { topicId }
  });
  return response;
};
