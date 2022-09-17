import { BaseResponse } from "./base";

export type CurrentUser = {
  userId: string;
  name: string;
  email: string;
};

export type LoginRequest = { email: string; password: string };

export type LoginResponse = BaseResponse & {
  response: CurrentUser | null;
};
