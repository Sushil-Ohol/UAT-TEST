export type Conversation = {
  id: string;
  message: string;
  date: string;
  userId: string;
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
