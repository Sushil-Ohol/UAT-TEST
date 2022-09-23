import { BaseResponse } from "./base";
import { ConversationDoc } from "./discussion";

export type DependsOn = {
  submittalId: string;
  submittal: string;
};

export type Assignee = {
  assignedTo: string;

  destination: string;

  email?: string;
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
  assigned: Assignee;
  docs?: ConversationDoc[];
};
export type SubmittalListResponse = BaseResponse & {
  response: SubmittalLog[];
};

export type Contractor = {
  name: string;
  email: string;
  assignees?: Assignee[];
};
