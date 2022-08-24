import { BaseResponse } from "./base";

export type ProjectSuggest = {
  projectName: String;
  details: string;
};
export type ProjectSuggestResponse = BaseResponse & {
  response: ProjectSuggest;
};
