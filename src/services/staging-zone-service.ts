import { client } from "./axios";
import { BASE_URL, CONVERSATION_LIST, CONVERSATION_DETAILS } from "./endpoints";
import { mockUpClient } from "./mock-server";

// Get Conversations
export const GetDiscussions = async () => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${CONVERSATION_LIST}`);
  return response;
};

// Get Conversation Details
export const GetDiscussionDetails = async () => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${CONVERSATION_DETAILS}`);
  return response;
};
