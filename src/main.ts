import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { json, NextFunction, Request, Response, urlencoded } from 'express'
import responseTime from 'response-time'
import { AppModule } from './app.module'
import NotFoundExceptionFilter from './common/notfound'
import validationPipe from './common/validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService: ConfigService = app.get(ConfigService)
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  }

  app.enableCors(corsOptions)
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Powered-By', 'Image-API')
    res.setHeader('X-Developed-By', 'Pradeep-Mishra')
    next()
  })

  app.use(responseTime())
  const Env = configService.get('NODE_ENV') || 'local'
  app.useGlobalPipes(validationPipe)
  app.useGlobalFilters(new NotFoundExceptionFilter())
  app.use(json({ limit: '3mb' }))
  app.use(urlencoded({ extended: true, limit: '3mb' }))

  //@ts-ignore
  await app.listen(process.env.PORT || configService.get('PORT') || 3000)
  Logger.log(`Server running on port ${configService.get('PORT')}`, 'MainApp')

  return app.getHttpServer()
}
export default bootstrap()
