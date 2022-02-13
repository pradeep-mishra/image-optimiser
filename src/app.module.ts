import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import NotFoundExceptionFilter from './common/notfound';
@Module({
  imports: [
    ConfigModule.forRoot(),
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),*/
    ApiModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },  
  ]
})
export class AppModule {}
