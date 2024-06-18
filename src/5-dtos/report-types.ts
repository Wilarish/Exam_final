import { ObjectId } from 'mongodb';

export type ReportMainType = {
  _id: ObjectId;
  authorLogin: string;
  carNumber: string;
  description: string;
  createdAt: string;
  authorId: ObjectId;
};
export type ReportViewAdminType = {
  id: ObjectId;
  authorLogin: string;
  carNumber: string;
  description: string;
  createdAt: string;
  authorId: ObjectId;
};
export type ReportViewType = {
  id: ObjectId;
  carNumber: string;
  description: string;
  createdAt: string;
};
