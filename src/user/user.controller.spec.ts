import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should set cookie', () => {
    const response = httpMock.createResponse();
    controller.setCookie('A1', response);
    expect(response.statusCode).toBe(200);
    expect(response.cookies['name'].value).toBe('A1');
  });

  it('should get cookie', () => {
    const request = httpMock.createRequest();
    request.cookies['name'] = 'A1';
    const response = controller.getCookie(request);
    expect(response).toBe('A1');
  });

  it('should be response queries', () => {
    const queries = {};
    const response = controller.getUsers(queries);
    expect(response).toBe(
      `GET users with search parameters ${JSON.stringify(queries)}`,
    );
  });

  it('should be response param', () => {
    const param = 'A1';
    const response = controller.getUser(param);
    expect(response).toBe(`GET user with id ${param}`);
  });
});
