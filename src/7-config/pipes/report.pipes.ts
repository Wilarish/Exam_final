import { IsString, Length } from 'class-validator';
import { Trim } from './trim';
import { LoginIsExist } from './is-login-exist';

export class ReportCreateValid {
  @Length(9, 9)
  @Trim()
  @IsString()
  carNumber: string;

  @Length(20, 500)
  @Trim()
  @IsString()
  description: string;

  @LoginIsExist()
  @Length(3, 20)
  @Trim()
  @IsString()
  authorLogin: string;
}
