/// <reference types="vite/client" />

/* React */
import { QueryFunctionContext } from '@tanstack/react-query';

/* Generic type definitions */
type Events = SyntheticEvent | Event;

type ObjectString = {
	[key: string]: string;
};

type ObjectPrimitive = {
	[key: string]: string | number | boolean;
};

/* Content type definitions */
type Answers = {
	close: string;
	message: string;
	success: string;
};

type AnswersRequest = [Answers, Function, Statuses];

type Category = {
	name: string;
	id: string;
	category: string;
	subCategory: string;
	description: string;
};

type CategoryQuestions = {
	id: string;
	difficulty: DifficultyMap;
	difficulty2: DifficultyMap2;
	values: string[][];
}[];

type CategoryValues = Category & {
	values: CategoryQuestions;
};

type CategoriesList = CategoryValues[];

type CategoriesObject = {
	[key: string]: CategoriesList;
};

type Difficulty = {
	id: string;
	name: string;
	description: string;
};

type DifficultyList = Difficulty[];

type DifficultyMap = {
	easy: number[];
	medium: number[];
	hard: number[];
};

type DifficultyMap2 = {
	easy: string[][];
	medium: string[][];
	hard: string[][];
};

type Game = {
	current: {
		guess: boolean | string;
		points: number;
		round: 'round1' | 'round2' | 'round3' | 'round4' | 'round5' | 'round6';
		status: 'pending' | 'correct' | 'incorrect' | 'close';
		scoreLogged: boolean;
	};
	settings: {
		category: boolean | Category;
		difficulty: boolean | Difficulty;
	};
	rounds: {
		round1: Round;
		round2: Round;
		round3: Round;
		round4: Round;
		round5: Round;
		round6: Round;
	};
};

type Hints = {
	message: string;
};

type HintsRequest = [Hints, Function, Statuses];

type Round = {
	id: boolean | string;
	status: 'pending' | 'complete' | 'failed' | 'close' | 'game end';
	difficulty: DifficultyMap;
	guesses: number;
	hints: string[];
	points: number;
	values: string[][];
};

/* Request type definitions */
type QueryKey = string[];

type RequestError = Error & {
	status?: number;
};

type Requests = {
	answers: (context: QueryFunctionContext) => Promise<Answers>;
	hints: (context: QueryFunctionContext) => Promise<Hints>;
};

type ResponseError = {
	error?: string;
};

type Statuses = {
	fetched: boolean;
	pending: boolean;
	success: boolean;
};

declare global {
	/* Declare global generic types */
	type EventsType = Events;

	type ObjectStringType = ObjectString;

	type ObjectPrimitiveType = ObjectPrimitive;

	/* Declare global content types */
	type AnswersType = Answers;

	type AnswersRequestType = AnswersRequest;

	type CategoryType = Category;

	type CategoryQuestionsType = CategoryQuestions;

	type CategoryValuesType = CategoryValues;

	type CategoriesListType = CategoriesList;

	type CategoriesObjectType = CategoriesObject;

	type DifficultyType = Difficulty;

	type DifficultyListType = DifficultyList;

	type DifficultyMap2Type = DifficultyMap2;

	type GameType = Game;

	type HintsType = Hints;

	type HintsRequestType = HintsRequest;

	type RoundType = Round;

	/* Declare global request types */
	type QueryKeyType = QueryKey;

	type RequestErrorType = RequestError;

	type RequestsType = Requests;

	type ResponseErrorType = ResponseError;

	/* Declare global prop types */
	type ObjectPrimitiveProps = ObjectPrimitive;

	/* Declare global content prop types */
	type CategoriesObjectProps = CategoriesObject;
}

/* Export global types */
export {};
