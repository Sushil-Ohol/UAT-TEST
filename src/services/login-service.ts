import { LoginRequest, LoginResponse } from "models/user";
import { client } from "./axios";
import { BASE_URL, LOGIN } from "./endpoints";
import { mockUpClient } from "./mock-server";

export const Login = async (request: LoginRequest) => {
  mockUpClient(client);
  const response = await client.get<LoginResponse>(`${BASE_URL}/${LOGIN}`, {
    params: request
  });
  console.log(response.data);
  return response;
};
