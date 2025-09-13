import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class SearchRecipesDto {
  @ApiProperty({
    description: 'List of available ingredients',
    type: [String],
    example: ['egg', 'milk', 'flour'],
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsArray()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ArrayNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString({ each: true })
  ingredients: string[];
}
