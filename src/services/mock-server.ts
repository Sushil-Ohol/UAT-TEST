/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-promise-executor-return */
/* eslint-disable global-require */
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  BASE_URL,
  FILE_UPLOAD,
  PROJECT_LIST,
  PROJECT_SUG,
  PROJECT_VALUE_V1,
  SUBMITTAL_LIST,
  CONVERSATION_LIST,
  CONVERSATION_DETAILS,
  LOGIN
} from "./endpoints";

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

  mock.onGet(`${BASE_URL}/${PROJECT_SUG}`).reply(() => {
    return [
      200,
      {
        projectName: "Kinder Park",
        details:
          " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum "
      }
    ];
  });

  mock.onGet(`${BASE_URL}/${PROJECT_VALUE_V1}`).reply(() => {
    return [
      200,
      {
        floors: 10,
        materials: 293,
        submittals: 3030
      }
    ];
  });

  const sleep = (value: number) =>
    new Promise((resolve) => setTimeout(resolve, value));

  mock.onPost(`${BASE_URL}/${FILE_UPLOAD}`).reply(async (config) => {
    const total = 1024;
    for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
      await sleep(500);
      if (config.onUploadProgress) {
        config.onUploadProgress({ loaded: total * progress, total });
      }
    }
    return [200, { success: true, title: "file 1", fileData: {} }];
  });

  mock.onGet(`${BASE_URL}/${SUBMITTAL_LIST}`).reply((config) => {
    if (config.params.projectId === "P00001") {
      const submittals = require("./mock-data/submittals_details.json");
      return [
        200,
        {
          success: true,
          response: submittals
        }
      ];
    }
    const submittals = require("./mock-data/submittals.json");
    return [
      200,
      {
        success: true,
        response: submittals
      }
    ];
  });

  mock.onGet(`${BASE_URL}/${CONVERSATION_LIST}`).reply(() => {
    const discussions = require("./mock-data/discussions.json");
    return [
      200,
      {
        success: true,
        response: discussions
      }
    ];
  });

  mock.onGet(`${BASE_URL}/${CONVERSATION_DETAILS}`).reply((config) => {
    const details = require("./mock-data/discussion-details.json");
    const discussion = details.find(
      (data: any) => data.topicId === config.params.topicId
    );
    return [
      200,
      {
        success: true,
        response: discussion
      }
    ];
  });

  mock.onGet(`${BASE_URL}/${LOGIN}`).reply((config) => {
    const userDetails = require("./mock-data/user.json");
    const user = userDetails.find(
      (data: any) =>
        data.email === config.params.email &&
        data.password === config.params.password
    );

    if (user) {
      delete user.password;
      return [
        200,
        {
          success: true,
          response: user,
          message: "Successfully Login"
        }
      ];
    }
    return [
      200,
      {
        success: false,
        response: {},
        message: "User Not Found"
      }
    ];
  });
}
