import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  constructor(private readonly appService: AppService, @Inject("NOTIFICATION") private subscriberService: ClientProxy) {
  }

  // @MessagePattern({ cmd: 'notifications' })
  // async getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
  //   console.log(`Topic: ${context.getPattern()}`);
  //   // console.time()
  //   // return new Promise((res, rej) => {
  //   //   setTimeout(() => {
  //   //     console.log('executado')
  //   //         context.getChannelRef().ack(context.getMessage());
  //   //     res('')
  //   //   }, 1000);
  //   // })
  // }

  @EventPattern({ cmd: 'notifications' })
  getNotifications2(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Event Pattern: ${context.getPattern()}`);
    // throw 'e'
    context.getChannelRef().ack(context.getMessage());
  }


}
