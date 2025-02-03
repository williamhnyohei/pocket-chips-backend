import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(), // Mock do método `find`
      findOne: jest.fn(), // Mock do método `findOne`
      save: jest.fn(), // Mock do método `save`
      create: jest.fn(), // Mock do método `create`
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // Vincula o mock ao token do repositório
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<jest.Mocked<Repository<User>>>(
      getRepositoryToken(User),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call userRepository.find when calling findAll()', async () => {
    const mockUsers = [
      { id: 1, email: 'test@example.com', password: '123456' },
    ];
    userRepository.find.mockResolvedValue(mockUsers); // Configura o mock

    const result = await service.findAll(); // Chama o serviço

    expect(result).toEqual(mockUsers); // Verifica o retorno
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(userRepository.find).toHaveBeenCalled(); // Verifica se o método foi chamado
  });
});
