import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Protegendo a rota para criar usuários (opcional)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password);
  }

  // Protegendo a rota para listar todos os usuários
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Protegendo a rota para buscar um único usuário pelo ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
