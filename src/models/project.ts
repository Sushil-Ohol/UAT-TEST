import { BaseResponse } from "./base";

export type Project = {
  id: string;
  name: string;
  description: string;
};
export type ProjectListResponse = BaseResponse & {
  response: Project[];
};
