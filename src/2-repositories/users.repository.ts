import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersMainClass, UsersModelType } from '../3-schemas/users.schema';
import { UsersMainType } from '../5-dtos/users-types';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UsersMainClass.name)
    private readonly usersModel: UsersModelType,
  ) {}

  async createSaveUser(user: UsersMainType) {
    await this.usersModel.createSaveUser(user, this.usersModel);
  }

  async findUserByLoginOrEmail(loginOrEmail: string) {
    return this.usersModel.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });
  }
  async deleteAllData() {
    await this.usersModel.deleteMany();
  }
}
