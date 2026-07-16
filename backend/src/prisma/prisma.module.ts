import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//Biến module này thành global để tất cả module khác k cần import lại module này nữa
@Global()
@Module({
  providers: [PrismaService],
})
export class PrismaModule { }
