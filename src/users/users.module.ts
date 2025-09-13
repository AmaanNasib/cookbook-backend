import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Recipe } from 'src/recipes/recipe.entity';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Recipe]), RecipesModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
