import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersMainType } from '../../5-dtos/users-types';
import { UsersRepository } from '../../2-repositories/users.repository';

@ValidatorConstraint({ name: 'LoginIsExist', async: true })
@Injectable()
export class LoginIsExistValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}
  async validate(loginOrEmail: string): Promise<boolean> {
    const user: UsersMainType | null =
      await this.usersRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user) {
      return false;
    }
    return true;
  }
  defaultMessage(): string {
    return 'this login is not exist';
  }
}
export function LoginIsExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: LoginIsExistValidator,
    });
  };
}
