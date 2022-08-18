import { BaseResponse } from "./base";

export type Project = {
  id: string;
  name: number;
};
export type ProjectListResponse = BaseResponse & {
  response: Project[];
};
