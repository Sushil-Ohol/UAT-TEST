import { http } from "./axios";

const upload = (file: any, onUploadProgress: any) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
};

const getFiles = () => {
  return http.get("/files");
};

export default {
  upload,
  getFiles
};
