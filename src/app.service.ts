import { Injectable } from '@nestjs/common';
import { IResponse } from './utils/global.interfaces';

@Injectable()
export class AppService {
  getApiStatus(): IResponse {
    return {
      msg: 'API working fine!',
      code: 'AS9',
    };
  }
}
