import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { UsersMainType } from '../5-dtos/users-types';

@Schema()
export class UsersMainClass {
  @Prop({ required: true })
  _id: ObjectId;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  passwordSalt: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  createdAt: string;

  static async createSaveUser(
    user: UsersMainType,
    model: Model<UsersMainClass>,
  ): Promise<string | null> {
    const newUser = new model();

    newUser._id = user._id;
    newUser.login = user.login;
    newUser.fullName = user.fullName;
    newUser.email = user.email;
    newUser.phoneNumber = user.phoneNumber;
    newUser.passwordSalt = user.passwordSalt;
    newUser.passwordHash = user.passwordHash;
    newUser.createdAt = user.createdAt;

    try {
      await newUser.save();
      return newUser._id.toString();
    } catch (err) {
      return null;
    }
  }
}

export interface UsersModelStaticsType {
  createSaveUser: (
    user: UsersMainType,
    model: Model<UsersMainClass>,
  ) => Promise<string | null>;
}

export const UsersSchema = SchemaFactory.createForClass(UsersMainClass);
export type UsersModelType = Model<UsersMainClass> & UsersModelStaticsType;

UsersSchema.statics.createSaveUser = UsersMainClass.createSaveUser;
