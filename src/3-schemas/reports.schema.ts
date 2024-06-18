import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { ReportMainType } from '../5-dtos/report-types';
import { Model } from 'mongoose';

@Schema()
export class ReportsMainClass {
  @Prop({ required: true })
  _id: ObjectId;

  @Prop({ required: true })
  authorLogin: string;

  @Prop({ required: true })
  authorId: ObjectId;

  @Prop({ required: true })
  carNumber: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createdAt: string;

  static async createSaveReport(
    report: ReportMainType,
    model: Model<ReportsMainClass>,
  ): Promise<string | null> {
    const newReport = new model();

    newReport._id = report._id;
    newReport.authorLogin = report.authorLogin;
    newReport.authorId = report.authorId;
    newReport.carNumber = report.carNumber;
    newReport.description = report.description;
    newReport.createdAt = report.createdAt;

    try {
      await newReport.save();
      return newReport._id.toString();
    } catch (err) {
      return null;
    }
  }
}
export interface ReportsModelStaticsType {
  createSaveReport: (
    report: ReportMainType,
    model: Model<ReportsMainClass>,
  ) => Promise<string | null>;
}
export const ReportsSchema = SchemaFactory.createForClass(ReportsMainClass);
export type ReportModelType = Model<ReportsMainClass> & ReportsModelStaticsType;

ReportsSchema.statics.createSaveReport = ReportsMainClass.createSaveReport;
