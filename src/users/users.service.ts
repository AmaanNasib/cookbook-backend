import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Recipe } from 'src/recipes/recipe.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async addSavedRecipe(userId: number, recipeId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    if (user.savedRecipeIds.includes(recipeId)) {
      return { message: 'Recipe already saved' };
    }

    user.savedRecipeIds.push(recipeId);
    await this.userRepository.save(user);

    return { message: 'Recipe saved' };
  }

  async removeSavedRecipe(userId: number, recipeId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    user.savedRecipeIds = user.savedRecipeIds.filter((id) => id !== recipeId);
    await this.userRepository.save(user);

    return { message: 'Recipe removed from saved' };
  }

  async findSavedRecipes(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    return user.savedRecipeIds;
  }
}
