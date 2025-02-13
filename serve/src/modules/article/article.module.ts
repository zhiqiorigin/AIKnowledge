import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { userProviders } from './article.provider'
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [...userProviders,ArticleService],
})

export class ArticleModule {}
