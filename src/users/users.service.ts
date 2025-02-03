import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Cria um novo usuário no banco.
   * @param email - Email do usuário
   * @param password - Senha criptografada
   * @returns Usuário criado (User)
   */
  async createUser(email: string, password: string): Promise<User> {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }

  /**
   * Atualiza um usuário existente no banco de dados.
   * @param id - ID do usuário a ser atualizado
   * @param updateData - Objeto contendo os campos que podem ser atualizados (email e/ou password)
   * @returns Usuário atualizado (User)
   * @throws NotFoundException - Se o usuário com o ID fornecido não for encontrado
   */
  async updateUser(
    id: number,
    updateData: { email?: string; password?: string },
  ): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
      return null;
    }

    if (updateData.email) {
      user.email = updateData.email;
    }

    if (updateData.password) {
      user.password = await bcrypt.hash(updateData.password, 10);
    }

    return await this.userRepo.save(user);
  }

  /**
   * Retorna todos os usuários cadastrados.
   * @returns Lista de usuários (User[])
   */
  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  /**
   * Busca um usuário pelo ID.
   * @param id - ID do usuário
   * @returns O usuário encontrado ou undefined se não existir
   */
  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user ?? null;
  }

  /**
   * Busca um usuário pelo email.
   * @param email - Email do usuário
   * @returns O usuário encontrado ou null se não existir
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    return user ?? null;
  }
}
