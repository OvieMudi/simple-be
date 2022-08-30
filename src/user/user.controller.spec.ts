import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUserService = {
  updateUser: jest.fn((id, dto) => ({
    id,
    ...dto,
  })),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { refreshToken: 'refresh' };
    expect(await controller.update('id', dto)).toEqual({
      id: 'id',
      ...dto,
    });

    expect(mockUserService.updateUser).toHaveBeenCalled();
  });
});
