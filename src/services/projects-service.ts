import { ProjectSuggestResponse } from "models/project-suggest";
import { client, http } from "./axios";
import {
  BASE_URL,
  FILE_UPLOAD,
  PROJECT_LIST,
  PROJECT_SUG,
  PROJECT_VALUE_V1
} from "./endpoints";
import { mockUpClient } from "./mock-server";

// project list
export const GetProjects = async () => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${PROJECT_LIST}`);
  return response;
};

// Project value  of a Project
export const GetProjectValue = async () => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${PROJECT_VALUE_V1}`);
  return response;
};

// Project suggestions
export const GetProjectSuggest = async () => {
  mockUpClient(client);
  const response = await client.get(`${BASE_URL}/${PROJECT_SUG}`);
  return response;
};

// Project - upload file of a Project
export const PostProjectFile = (data: any, setProgress: any) => {
  const response = http.post<ProjectSuggestResponse>(
    `${BASE_URL}/${FILE_UPLOAD}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: (progressEvent) => {
        const progressCount = Math.ceil(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setProgress(progressCount);
      }
    }
  );
  if (response) {
    return {
      remote: "success",
      data: response,
      error: { errors: "" }
    };
  }
  return response;
};

export const PostProjectFile1 = (data: any, setProgress: any) => {
  mockUpClient(client);
  const response = client.post<ProjectSuggestResponse>(
    `${BASE_URL}/${FILE_UPLOAD}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: (progressEvent) => {
        const progressCount = Math.ceil(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setProgress(progressCount);
      }
    }
  );
  if (response) {
    return {
      remote: "success",
      data: response,
      error: { errors: "" }
    };
  }
  return response;
};
