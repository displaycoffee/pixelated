/* Type definitions */
type Category = {
	id: string;
	values: string[][];
};

type Categories = {
	name: string;
	value: string;
	values: Category[];
};

type Difficulty = {
	name: string;
	value: string;
};

/* Export types */
export type CategoryType = Category[];

export type CategoriesType = Categories[];

export type DifficultyType = Difficulty[];
