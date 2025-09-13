import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
  ) {}

  async searchByIngredients(ingredients: string[]): Promise<Recipe[]> {
    return await this.recipesRepository
      .createQueryBuilder('recipe')
      .where(':ingredients <@ recipe.ingredients', { ingredients })
      .getMany();
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipesRepository.find();
  }

  async create(recipe: Partial<Recipe>): Promise<Recipe> {
    const newRecipe = this.recipesRepository.create(recipe);
    return await this.recipesRepository.save(newRecipe);
  }

  async findOneById(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOneBy({ id });
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
    return recipe;
  }
}
