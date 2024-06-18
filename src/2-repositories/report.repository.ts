import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReportModelType, ReportsMainClass } from '../3-schemas/reports.schema';
import { ReportMainType } from '../5-dtos/report-types';
import { ObjectId } from 'mongodb';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectModel(ReportsMainClass.name)
    private readonly reportModel: ReportModelType,
  ) {}

  async findReportById(reportId: string) {
    return this.reportModel.findOne({ _id: new ObjectId(reportId) });
  }

  async createSaveReport(report: ReportMainType): Promise<string | null> {
    return this.reportModel.createSaveReport(report, this.reportModel);
  }
  async deleteReportById(reportId: string): Promise<boolean> {
    const result = await this.reportModel.deleteOne({
      _id: new ObjectId(reportId),
    });
    return result.deletedCount === 1;
  }
  async deleteAllData() {
    await this.reportModel.deleteMany();
  }
}
