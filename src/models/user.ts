import { BaseResponse } from "./base";

export type User = {
  userId: string;
  name: string;
  email: string;
  company: { name: string; email: string };
};

export type LoginRequest = { email: string; password: string };

export type LoginResponse = BaseResponse & {
  response: User | null;
};
