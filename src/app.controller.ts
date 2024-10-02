import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponse } from './utils/global.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiStatus(): IResponse {
    return this.appService.getApiStatus();
  }
}
