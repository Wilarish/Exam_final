import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersMainClass, UsersModelType } from '../../3-schemas/users.schema';
import { ObjectId } from 'mongodb';
import { UsersMainType, UsersViewType } from '../../5-dtos/users-types';
import {
  ExceptionsNames,
  ResponseToControllersHelper,
} from '../../6-helpers/response-to-controller-helper';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectModel(UsersMainClass.name)
    private readonly usersModel: UsersModelType,
  ) {}

  async getViewUserById(userId: string): Promise<ResponseToControllersHelper> {
    const userDb: UsersMainType = await this.usersModel
      .findById(new ObjectId(userId))
      .select({ __v: 0, passwordSalt: 0, passwordHash: 0 })
      .lean();

    if (!userDb) {
      return new ResponseToControllersHelper(
        true,
        ExceptionsNames.NotFound_404,
      );
    }

    const userView: UsersViewType = {
      id: userDb._id,
      login: userDb.login,
      fullName: userDb.fullName,
      email: userDb.email,
      phoneNumber: userDb.phoneNumber,
      createdAt: userDb.createdAt,
    };

    return new ResponseToControllersHelper(false, undefined, userView);
  }
  async getAllViewUsers(): Promise<ResponseToControllersHelper> {
    const usersDb = await this.usersModel
      .find()
      .select({ __v: 0, passwordSalt: 0, passwordHash: 0 })
      .lean();

    const count = usersDb.length;
    const items: UsersViewType[] = usersDb.map((user) => {
      return {
        id: user._id,
        login: user.login,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
      };
    });

    const usersView = {
      usersCount: count,
      items,
    };
    return new ResponseToControllersHelper(false, undefined, usersView);
  }
}
