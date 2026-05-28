import { Get, Post, Body, Controller } from '@nestjs/common';
import { EmailDto } from './email.dto';

@Controller('/')
export class AppController {
  @Get()
  testagem() {
    return { text: 'Hello World' };
  }

  @Post()
  testaEmail(@Body() body: EmailDto) {
    return { success: true, email: body.email };
  }
}
