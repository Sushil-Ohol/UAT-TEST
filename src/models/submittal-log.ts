import { BaseResponse } from "./base";

export type SubmittalLog = {
  id: string;
  submittal: string;
  description: string;
  notification: number;
  comments: number;
  revision: number;
  status: string;
  dueBy: string;
  governingDate: string;
  contractor: { name: string; email: string };
  dependsOn: string;
  assigned: { assignedTo: string; destination: string };
};
export type SubmittalListResponse = BaseResponse & {
  response: SubmittalLog[];
};
