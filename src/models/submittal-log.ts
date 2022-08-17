import { BaseResponse } from "./base";

export type SubmittalLog = {
  id: string;
  submittal: number;
  notification: number;
  comments: number;
  revision: number;
  status: string;
  dueBy: string;
  contractor: string;
  dependsOn: string;
  assigned: string;
};
export type SubmittalListResponse = BaseResponse & {
  response: SubmittalLog[];
};
