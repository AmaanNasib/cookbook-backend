import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { mockRecipes } from './mock-recipes.data';

@Controller('mock-api')
export class MockRecipesController {
  
  @Get('lookup.php')
  lookupMealById(@Query('i') id: string) {
    const meal = mockRecipes.find(m => m.idMeal === id);
    if (!meal) {
      throw new NotFoundException('Recipe not found');
    }
    return { meals: [meal] };
  }

  @Get('filter.php')
  filterByIngredient(@Query('i') ingredient: string) {
    const filteredMeals = mockRecipes.filter(meal => {
      for(let i=1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        if (ing && ing.toLowerCase() === ingredient.toLowerCase()) {
          return true;
        }
      }
      return false;
    });
    return { meals: filteredMeals.length ? filteredMeals : null };
  }

  @Get('search.php')
  searchByName(@Query('s') search: string) {
    const filteredMeals = mockRecipes.filter(meal =>
      meal.strMeal.toLowerCase().includes(search.toLowerCase())
    );
    return { meals: filteredMeals.length ? filteredMeals : null };
  }
}
