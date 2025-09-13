import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @ManyToMany(() => User, (user) => user.savedRecipes)
  // savedByUsers: User[];

  @Column('text', { array: true })
  ingredients: string[];

  @Column('text')
  instructions: string;
}
