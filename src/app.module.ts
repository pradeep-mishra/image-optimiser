import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import NotFoundExceptionFilter from './common/notfound';
import { OptimizeModule } from './optimize/optimize.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),*/
    OptimizeModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },  
  ]
})
export class AppModule {}
