/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            updateUser: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
      };
      service.createUser.mockResolvedValue(mockUser);

      const result = await controller.create({
        email: 'test@example.com',
        password: '123456',
      });

      expect(result).toEqual(mockUser);
      expect(service.createUser).toHaveBeenCalledWith(
        'test@example.com',
        '123456',
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'updated@example.com',
        password: 'updated123',
      };
      service.updateUser.mockResolvedValue(mockUser);

      const result = await controller.updateUser(1, {
        email: 'updated@example.com',
      });

      expect(result).toEqual(mockUser);
      expect(service.updateUser).toHaveBeenCalledWith(1, {
        email: 'updated@example.com',
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      service.updateUser.mockResolvedValue(null);

      await expect(
        controller.updateUser(999, { email: 'notfound@example.com' }),
      ).rejects.toThrow(NotFoundException);
      expect(service.updateUser).toHaveBeenCalledWith(999, {
        email: 'notfound@example.com',
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
      };
      service.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user is not found', async () => {
      service.findOne.mockResolvedValue(null);

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });
});
