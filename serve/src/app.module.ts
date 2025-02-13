import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './config/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransformInterceptor } from '@/interceptors/transform.interceptor'; // 确保路径正确
import { AllExceptionsFilter } from '@/filters/http-exception.filter';
import { TodoModule } from './modules/todo/todo.module';
import { KnowledgeModule} from './modules/knowledge/knowledge.module'
import { ArticleModule } from './modules/article/article.module';
@Module({
  imports: [DatabaseModule, 
    AuthModule, 
    UsersModule, 
    TodoModule,
    KnowledgeModule,
    ArticleModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
