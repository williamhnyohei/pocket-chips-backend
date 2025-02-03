import {
  Controller,
  Put,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { email: string; password: string }): Promise<User> {
    return this.usersService.createUser(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { email?: string; password?: string },
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(id, body);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
