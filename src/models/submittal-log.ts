import { BaseResponse } from "./base";

export type DependsOn = {
  submittalId: string;
  submittal: string;
};

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
  dependsOn: DependsOn[];
  assigned: { assignedTo: string; destination: string };
};
export type SubmittalListResponse = BaseResponse & {
  response: SubmittalLog[];
};
export type Assignee = {
  name: string;
  role: string;
  email?: string;
};
export type Contractor = {
  name: string;
  email: string;
  assignees?: Assignee[];
};
