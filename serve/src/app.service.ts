import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AI Knowledge, designed by Jin Ziky';
  }
}
