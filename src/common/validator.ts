import { ValidationPipe } from '@nestjs/common';

const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true
});
export default validationPipe;
