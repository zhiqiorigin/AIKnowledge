import { Module } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeController } from './knowledge.controller';
import { DatabaseModule } from '../../config/database.module';
import { userProviders } from './knowledge.provider'
@Module({
  imports: [DatabaseModule],
  controllers: [KnowledgeController],
  providers: [...userProviders,KnowledgeService],
})
export class KnowledgeModule {}
