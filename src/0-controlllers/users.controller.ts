import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasicAuthGuard } from '../7-config/guards/basic.auth.guard';
import { UserLoginValid, UserCreateValid } from '../7-config/pipes/users.pipes';
import { ResponseToControllersHelper } from '../6-helpers/response-to-controller-helper';
import { UsersService } from '../1-services/users.service';
import { UsersQueryRepository } from '../2-repositories/query/users.query.repository';
import { CustomObjectIdValidationPipe } from '../7-config/pipes/custom-objectId-pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards()
  async getAllUsers() {
    const result: ResponseToControllersHelper =
      await this.usersQueryRepository.getAllViewUsers();

    return ResponseToControllersHelper.checkReturnException(result);
  }
  @Get(':id')
  @UseGuards()
  async getUserById(@Param('id', CustomObjectIdValidationPipe) userId: string) {
    const result: ResponseToControllersHelper =
      await this.usersQueryRepository.getViewUserById(userId);

    return ResponseToControllersHelper.checkReturnException(result);
  }

  @Post('registration')
  @HttpCode(204)
  @UseGuards()
  async registration(@Body() dto: UserCreateValid) {
    const result: ResponseToControllersHelper =
      await this.usersService.registration(dto);

    return ResponseToControllersHelper.checkReturnException(result);
  }
  @Post('login')
  @HttpCode(200)
  @UseGuards()
  async login(@Body() dto: UserLoginValid) {
    const result: ResponseToControllersHelper =
      await this.usersService.login(dto);

    return ResponseToControllersHelper.checkReturnException(result);
  }
}
