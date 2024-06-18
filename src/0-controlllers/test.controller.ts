import { Controller, Delete, UseGuards } from '@nestjs/common';
import * as process from 'node:process';
import { UsersRepository } from '../2-repositories/users.repository';
import { ReportRepository } from '../2-repositories/report.repository';
import { BasicAuthGuard } from '../7-config/guards/basic.auth.guard';

@Controller('testing')
export class TestController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly reportsRepository: ReportRepository,
  ) {}

  @Delete('all-data')
  @UseGuards(BasicAuthGuard)
  async DeleteAllData() {
    await this.reportsRepository.deleteAllData();
    await this.usersRepository.deleteAllData();
  }
}
