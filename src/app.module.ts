import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersMainClass, UsersSchema } from './3-schemas/users.schema';
import { UsersController } from './0-controlllers/users.controller';
import { UsersService } from './1-services/users.service';
import { UsersRepository } from './2-repositories/users.repository';
import { UsersQueryRepository } from './2-repositories/query/users.query.repository';
import { BcryptAdapter } from './4-adapters/bcrypt.adapter';
import { LoginOrEmailIsAlreadyExistValidator } from './7-config/pipes/login-is-already-exist';
import { ReportsSchema, ReportsMainClass } from './3-schemas/reports.schema';
import { ReportController } from './0-controlllers/report.controller';
import { ReportService } from './1-services/report.service';
import { ReportRepository } from './2-repositories/report.repository';
import { ReportsQueryRepository } from './2-repositories/query/report.query.repository';
import { LoginIsExistValidator } from './7-config/pipes/is-login-exist';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://tararammmm2004:w5iGTWlkB8HFRjes@cluster0.vwzbeey.mongodb.net/Posts_Blogs_HW2?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      {
        name: UsersMainClass.name,
        schema: UsersSchema,
      },
      {
        name: ReportsMainClass.name,
        schema: ReportsSchema,
      },
      // {
      //   name: RateLimitMainClass.name,
      //   schema: RateLimitSchema,
      // },
    ]),
  ],
  controllers: [UsersController, ReportController],
  providers: [
    UsersService,
    ReportService,

    UsersRepository,
    ReportRepository,

    UsersQueryRepository,
    ReportsQueryRepository,

    BcryptAdapter,

    LoginOrEmailIsAlreadyExistValidator,
    LoginIsExistValidator,
  ],
})
export class AppModule {}
