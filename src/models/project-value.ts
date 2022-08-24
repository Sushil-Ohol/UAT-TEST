import { BaseResponse } from "./base";

export type Project = {
  floors: number;
  materials: number;
  submittals: number;
};
export type ProjectValueResponse = BaseResponse & {
  response: Project;
};
