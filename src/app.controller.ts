import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { I_DSERVICE_NAME, IDResponse, IDRequest } from './transaction-id/id.pb';
import { AppService } from './app.service';
import { SnowFlakeId } from 'snowflake-id';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  snowflake = new SnowFlakeId({
    mid: 42,
    offset: (2019 - 1970) * 31536000 * 1000,
  });

  @GrpcMethod(I_DSERVICE_NAME, 'GetID')
  private async createID(data: IDRequest): Promise<IDResponse> {
    return this.snowflake.generate();
  }
}
