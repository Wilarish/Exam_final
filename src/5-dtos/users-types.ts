import { ObjectId } from 'mongodb';

export type UsersViewType = {
  id: ObjectId;
  login: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
};
export type UsersGetInfoAboutMeType = {
  userId: ObjectId;
  login: string;
  email: string;
};

export type UsersMainType = {
  _id: ObjectId;
  login: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  passwordSalt: string;
  passwordHash: string;
  createdAt: string;
};
