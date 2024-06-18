import { Injectable, Res } from '@nestjs/common';
import { ReportRepository } from '../2-repositories/report.repository';
import { ReportCreateValid } from '../7-config/pipes/report.pipes';
import {
  ExceptionsNames,
  ResponseToControllersHelper,
} from '../6-helpers/response-to-controller-helper';
import { ReportMainType } from '../5-dtos/report-types';
import { ObjectId } from 'mongodb';
import { UsersRepository } from '../2-repositories/users.repository';
import { ReportsQueryRepository } from '../2-repositories/query/report.query.repository';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly usersRepository: UsersRepository,
    private readonly reportQueryRepository: ReportsQueryRepository,
  ) {}

  async createSaveReport(
    dto: ReportCreateValid,
  ): Promise<ResponseToControllersHelper> {
    const userDb = await this.usersRepository.findUserByLoginOrEmail(
      dto.authorLogin,
    );

    if (!userDb) {
      return new ResponseToControllersHelper(
        true,
        ExceptionsNames.BadRequest_400,
      );
    }

    const newReport: ReportMainType = {
      _id: new ObjectId(),
      authorLogin: dto.authorLogin,
      carNumber: dto.carNumber,
      description: dto.description,
      createdAt: new Date().toISOString(),
      authorId: userDb._id,
    };

    await this.reportRepository.createSaveReport(newReport);

    const reportDb = await this.reportRepository.findReportById(
      newReport._id.toString(),
    );

    if (!reportDb) {
      return new ResponseToControllersHelper(
        true,
        ExceptionsNames.BadRequest_400,
      );
    }

    const reportsForCurrentUserDb =
      await this.reportQueryRepository.returnAllReportsByUserId(
        newReport.authorId.toString(),
      );

    return new ResponseToControllersHelper(
      false,
      undefined,
      reportsForCurrentUserDb.responseData,
    );
  }

  async deleteReportById(reportId: string) {
    const result: boolean =
      await this.reportRepository.deleteReportById(reportId);

    if (!result) {
      return new ResponseToControllersHelper(
        true,
        ExceptionsNames.NotFound_404,
      );
    }

    return new ResponseToControllersHelper(false);
  }
}
