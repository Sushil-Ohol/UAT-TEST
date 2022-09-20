import { BaseResponse } from "./base";

export type Conversation = {
  id: string;
  messageBy: string;
  messageDate: string;
  message: string;
};

export type ConversationDoc = {
  id: string;
  fileName: string;
  url: string;
  uploadedBy: string;
  uploadDate: Date;
  annotationCount: number;
};

export type Discussion = {
  topicId: string;
  topicName: string;
  unreadCount: number;
  documentCount: number;
  chats?: Conversation[];
  docs?: ConversationDoc[];
};

export type DiscussionDetailsResponse = BaseResponse & {
  response: Discussion;
};
