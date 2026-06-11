/// <reference types="vite/client" />

/* Packages */
import { QueryFunctionContext } from '@tanstack/react-query';

/* Generic type definitions */
type Events = SyntheticEvent | Event;

type ObjectPrimitive = {
	[key: string]: Primitive;
};

type Primitive = string | number | boolean;

type Theme = {
	bps: {
		bp01: Primitive;
		bp02: Primitive;
		bp03: Primitive;
		bp04: Primitive;
	};
	colors: {
		color01: Primitive;
		color02: Primitive;
		color03: Primitive;
		color04: Primitive;
		color05: Primitive;
		color06: Primitive;
		color07: Primitive;
		color08: Primitive;
		color09: Primitive;
		color10: Primitive;
		color11: Primitive;
		color12: Primitive;
	};
};

type Utils = {
	getLast: (value: string | string[], delimeter?: string) => string | number;
	scrollTo: (e?: Events, selector?: string, offset?: number) => void;
};

type Variables = {
	paths: {
		api: string;
		basename: string;
	};
};

/* Content type definitions */
type Actions = {
	hasActions: boolean;
	getHint?: Function;
	hasHints: boolean;
};

type Answers = {
	close: string;
	message: string;
	success: string;
	title?: string;
	characters?: string;
};

type AnswersRequest = [Answers, Function, Statuses];

type Category = {
	name: string;
	id: string;
	category: string;
	subCategory: string;
	description: string;
};

type CategoryHexMap = {
	[key: string]: string[][];
};

type CategoryNumbersMap = {
	[key: string]: {
		[key: string]: number[];
	};
};

type CategoryQuestions = {
	id: string;
	values: string[][][];
}[];

type CategoryValues = Category & {
	values: CategoryQuestions;
};

type CategoryValuesRaw = {
	id: string;
	values: string[][];
	hexMap: CategoryNumbersMap | boolean;
}[];

type CategoriesList = CategoryValues[];

type CategoriesObject = {
	[key: string]: CategoriesList;
};

type Difficulty = {
	id: number;
	name: string;
	description: string;
};

type DifficultyList = Difficulty[];

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

type Pagination = {
	resetGame: Function;
};

type Round = {
	id: boolean | string;
	status: 'pending' | 'complete' | 'failed' | 'close' | 'game end';
	guesses: number;
	hints: string[];
	points: number;
	values: string[][][];
	title: string;
	characters: string;
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

	type ObjectPrimitiveType = ObjectPrimitive;

	type ThemeType = Theme;

	type UtilsType = Utils;

	type VariablesType = Variables;

	/* Declare global content types */
	type AnswersType = Answers;

	type AnswersRequestType = AnswersRequest;

	type CategoryType = Category;

	type CategoryHexMapType = CategoryHexMap;

	type CategoryNumbersMapType = CategoryNumbersMap;

	type CategoryQuestionsType = CategoryQuestions;

	type CategoryValuesType = CategoryValues;

	type CategoryValuesRawType = CategoryValuesRaw;

	type CategoriesListType = CategoriesList;

	type CategoriesObjectType = CategoriesObject;

	type DifficultyType = Difficulty;

	type DifficultyListType = DifficultyList;

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
	type ActionsProps = Actions;

	type CategoriesObjectProps = CategoriesObject;

	type PaginationProps = Pagination;
}

/* Export global types */
export {};
