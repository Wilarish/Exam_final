import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ResponseToControllersHelper } from '../6-helpers/response-to-controller-helper';
import { ReportsQueryRepository } from '../2-repositories/query/report.query.repository';
import { ReportService } from '../1-services/report.service';
import { CustomObjectIdValidationPipe } from '../7-config/pipes/custom-objectId-pipe';
import { ReportCreateValid } from '../7-config/pipes/report.pipes';

@Controller('reports')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly reportQueryRepository: ReportsQueryRepository,
  ) {}

  @Get()
  async getAllReports() {
    const result = await this.reportQueryRepository.returnAllViewReports();
    return ResponseToControllersHelper.checkReturnException(result);
  }
  @Get(':id')
  async getReportsByUserId(
    @Param('id', CustomObjectIdValidationPipe) userId: string,
  ) {
    const result =
      await this.reportQueryRepository.returnAllReportsByUserId(userId);

    return ResponseToControllersHelper.checkReturnException(result);
  }
  @Post()
  @HttpCode(200)
  async createReport(@Body() dto: ReportCreateValid) {
    const result = await this.reportService.createSaveReport(dto);

    return ResponseToControllersHelper.checkReturnException(result);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteReportById(
    @Param('id', CustomObjectIdValidationPipe) reportId: string,
  ) {
    const result = await this.reportService.deleteReportById(reportId);

    return ResponseToControllersHelper.checkReturnException(result);
  }
}
