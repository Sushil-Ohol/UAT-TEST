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
  status: string;
};

export type SubmittalLog = {
  id: string;
  submittal: string;
  description: string;
  notification: number;
  comments: number;
  revision: number | null;
  status: string;
  dueBy: string;
  governingDate: string;
  company: { name: string; email: string };
  dependsOn: DependsOn[];
  assigned: Assignee;
  docs?: ConversationDoc[];
};
export type SubmittalListResponse = BaseResponse & {
  response: SubmittalLog[];
};

export type Company = {
  name: string;
  email: string;
  assignees?: Assignee[];
};
