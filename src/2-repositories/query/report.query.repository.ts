import { Injectable } from '@nestjs/common';
import {
  ReportModelType,
  ReportsMainClass,
} from '../../3-schemas/reports.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseToControllersHelper } from '../../6-helpers/response-to-controller-helper';
import { ReportViewAdminType, ReportViewType } from '../../5-dtos/report-types';
import { ObjectId } from 'mongodb';

@Injectable()
export class ReportsQueryRepository {
  constructor(
    @InjectModel(ReportsMainClass.name)
    private readonly reportsModel: ReportModelType,
  ) {}

  async returnAllViewReports(): Promise<ResponseToControllersHelper> {
    const reportsDb = await this.reportsModel.find().select({ __v: 0 }).lean();

    const count = reportsDb.length;
    const items: ReportViewAdminType[] = reportsDb.map((report) => {
      return {
        id: report._id,
        authorLogin: report.authorLogin,
        carNumber: report.carNumber,
        description: report.description,
        createdAt: report.createdAt,
        authorId: report.authorId,
      };
    });

    const reportsView = {
      reportsCount: count,
      items,
    };
    return new ResponseToControllersHelper(false, undefined, reportsView);
  }

  async returnAllReportsByUserId(
    userId: string,
  ): Promise<ResponseToControllersHelper> {
    const reportsDb = await this.reportsModel
      .find({ authorId: new ObjectId(userId) })
      .select({ __v: 0, authorId: 0 })
      .lean();

    const count = reportsDb.length;
    const items: ReportViewType[] = reportsDb.map((report) => {
      return {
        id: report._id,
        carNumber: report.carNumber,
        description: report.description,
        createdAt: report.createdAt,
      };
    });

    const reportsView: { reportsCount: number; items: ReportViewType[] } = {
      reportsCount: count,
      items,
    };
    return new ResponseToControllersHelper(false, undefined, reportsView);
  }
}
