import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import type { Request } from 'express';

interface AuthRequest extends Request {
  user?: { userId: number; email: string };
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('saved-recipes/:recipeId')
  async saveRecipe(
    @Param('recipeId') recipeId: string,
    @Req() req: AuthRequest,
  ) {
    if (!req.user) throw new UnauthorizedException('User not authenticated');
    const userId = req.user.userId;
    return this.usersService.addSavedRecipe(userId, recipeId);
  }

  @Delete('saved-recipes/:recipeId')
  async removeSavedRecipe(
    @Param('recipeId') recipeId: string,
    @Req() req: AuthRequest,
  ) {
    if (!req.user) throw new UnauthorizedException('User not authenticated');
    const userId = req.user.userId;
    return this.usersService.removeSavedRecipe(userId, recipeId);
  }

  @Get('saved-recipes')
  async getSavedRecipes(@Req() req: AuthRequest) {
    if (!req.user) throw new UnauthorizedException('User not authenticated');
    const userId = req.user.userId;
    return this.usersService.findSavedRecipes(userId);
  }
}
