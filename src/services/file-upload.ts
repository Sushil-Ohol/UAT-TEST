import { ProjectSuggestResponse } from "models/project-suggest";
import { http } from "./axios";
import { BASE_URL, FILE_UPLOAD } from "./endpoints";

// Project suggest  of a Project
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
