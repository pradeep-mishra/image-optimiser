import {
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException
} from '@nestjs/common'

@Catch(NotFoundException)
export default class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: any) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    response.status(404).json({ error: 'Not Found' })
  }
}
