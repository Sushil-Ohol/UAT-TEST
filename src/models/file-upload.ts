import { BaseResponse } from "./base";

export type FileUpload = {
  title: String;
  fileData: any;
};
export type FileUploadResponse = BaseResponse & {
  response: FileUpload;
};
