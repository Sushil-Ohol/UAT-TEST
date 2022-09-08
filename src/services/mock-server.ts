/* eslint-disable global-require */
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, PROJECT_LIST } from "./endpoints";

export function mockUpClient(client: AxiosInstance) {
  const mock = new MockAdapter(client);

  mock.onGet(`${BASE_URL}/${PROJECT_LIST}`).reply(() => {
    const projects = require("./mock-data/projects.json");
    return [
      200,
      {
        success: true,
        response: projects
      }
    ];
  });

  mock.onGet(`${BASE_URL}/${PROJECT_LIST}`).reply(() => {
    const projects = require("./mock-data/projects.json");
    return [
      200,
      {
        success: true,
        response: projects
      }
    ];
  });
}
