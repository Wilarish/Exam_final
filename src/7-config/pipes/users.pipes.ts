import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';
import { Trim } from './trim';
import { LoginOrEmailIsAlreadyExist } from './login-is-already-exist';

export class UserCreateValid {
  @LoginOrEmailIsAlreadyExist()
  @Length(3, 20)
  @Trim()
  @IsString()
  login: string;

  @Length(6, 20)
  @Trim()
  @IsString()
  password: string;

  @LoginOrEmailIsAlreadyExist()
  @Length(7, 100)
  @IsEmail()
  @Trim()
  @IsString()
  email: string;

  @Length(3, 200)
  @IsString()
  fullName: string;

  @IsPhoneNumber()
  @Trim()
  @IsString()
  phoneNumber: string;
}
export class UserLoginValid {
  @Length(1, 50)
  @Trim()
  @IsString()
  loginOrEmail: string;

  @Length(6, 20)
  @Trim()
  @IsString()
  password: string;
}
