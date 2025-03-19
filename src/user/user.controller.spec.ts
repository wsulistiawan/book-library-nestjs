import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
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
