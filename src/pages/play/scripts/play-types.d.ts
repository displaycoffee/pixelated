/* Type definitions */
type Category = {
	id: string;
	question: string;
};

type Categories = {
	name: string;
	value: string;
};

type Difficulty = {
	name: string;
	value: string;
};

/* Export types */
export type CategoryType = Category[];

export type CategoriesType = Categories[];

export type DifficultyType = Difficulty[];
