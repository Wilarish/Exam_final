import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//import bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter {
  async passwordHash(
    password: string,
  ): Promise<{ passwordSalt; passwordHash }> {
    const passwordSalt: string = await bcrypt.genSalt(10);
    const passwordHash: string = await bcrypt.hash(password, passwordSalt);

    return {
      passwordSalt,
      passwordHash,
    };
  }

  async passwordCheck(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
