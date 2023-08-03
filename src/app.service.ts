import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(@Inject("NOTIFICATION") private subscriberService: ClientProxy) {
    setInterval(async () => {
      await this.execute()
    }, 500);

  }

  getHello(): string {
    return 'Hello World!';
  }

  async execute() {
    console.log('notifications')
    this.subscriberService.emit({ cmd: 'notifications' }, 'Hello World!')
  }


}
