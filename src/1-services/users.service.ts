import { Inject, Injectable, Res } from '@nestjs/common';
import { UserLoginValid, UserCreateValid } from '../7-config/pipes/users.pipes';
import { UsersMainType } from '../5-dtos/users-types';
import { ObjectId } from 'mongodb';
import { BcryptAdapter } from '../4-adapters/bcrypt.adapter';
import {
  ExceptionsNames,
  ResponseToControllersHelper,
} from '../6-helpers/response-to-controller-helper';
import { UsersRepository } from '../2-repositories/users.repository';
import { UsersQueryRepository } from '../2-repositories/query/users.query.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}
  async registration(dto: UserCreateValid) {
    const passInfo = await this.bcryptAdapter.passwordHash(dto.password);

    const user: UsersMainType = {
      _id: new ObjectId(),
      login: dto.login,
      fullName: dto.fullName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      passwordSalt: passInfo.passwordSalt,
      passwordHash: passInfo.passwordHash,
      createdAt: new Date().toISOString(),
    };

    await this.usersRepository.createSaveUser(user);

    const resultUserView: ResponseToControllersHelper =
      await this.usersQueryRepository.getViewUserById(user._id.toString());

    if (!resultUserView.responseData) {
      return new ResponseToControllersHelper(
        true,
        ExceptionsNames.BadRequest_400,
      );
    }
    return new ResponseToControllersHelper(
      false,
      undefined,
      resultUserView.responseData,
    );
  }

  async login(dto: UserLoginValid) {
    const userDb = await this.usersRepository.findUserByLoginOrEmail(
      dto.loginOrEmail,
    );
    if (!userDb) {
      return new ResponseToControllersHelper(
        true,
        ExceptionsNames.Unauthorized_401,
      );
    }

    const passCheck = await this.bcryptAdapter.passwordCheck(
      dto.password,
      userDb.passwordHash,
    );
    if (!passCheck) {
      return new ResponseToControllersHelper(
        true,
        ExceptionsNames.Unauthorized_401,
      );
    }
    const userDbView = await this.usersQueryRepository.getViewUserById(
      userDb._id.toString(),
    );

    return new ResponseToControllersHelper(
      false,
      undefined,
      userDbView.responseData,
    );
  }
}
