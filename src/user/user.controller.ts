import {
  Controller,
  Get,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/users')
export class UserController {
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Set cookie successful');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'] as string;
  }

  @Get()
  getUsers(@Query() query: Record<string, any>): string {
    return `GET users with search parameters ${JSON.stringify(query)}`;
  }

  @Get('/:id')
  getUser(@Param('id') id: string): string {
    return `GET user with id ${id}`;
  }

  @Post()
  @HttpCode(201)
  addUser(): string {
    return 'POST';
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      statusCode: 301,
      url: '/api/users/',
    };
  }
}
