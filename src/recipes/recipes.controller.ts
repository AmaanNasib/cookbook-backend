import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { SearchRecipesDto } from './dto/search-recipes.dto';
import { Recipe } from './recipe.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiOperation({ summary: 'Search recipes by available ingredients' })
  @Post('search')
  async search(@Body() searchDto: SearchRecipesDto): Promise<Recipe[]> {
    return this.recipesService.searchByIngredients(searchDto.ingredients);
  }

  @ApiOperation({ summary: 'Get all recipes' })
  @Get()
  async findAll(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @ApiOperation({ summary: 'Full recipes' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Recipe> {
    return this.recipesService.findOneById(id);
  }
}
