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
	message: string;
	success: string;
};

type AnswersQueryKey = {
	queryKey: [string, string, string];
};

type AnswersRequest = [Answers, Statuses];

type Category = {
	id: string;
	values: string[][];
};

type CategoryList = Category[];

type Categories = {
	name: string;
	value: string;
	values: Category[];
};

type CategoriesList = Categories[];

type Difficulty = {
	name: string;
	value: string;
};

type DifficultyList = Difficulty[];

type Game = {
	current: {
		guess: boolean | string;
		hint: boolean | string;
		points: number;
		round: 'round1' | 'round2' | 'round3' | 'round4' | 'round5';
		status: 'pending' | 'correct' | 'incorrect';
	};
	settings: {
		category: boolean | string;
		difficulty: boolean | string;
	};
	rounds: {
		round1: Round;
		round2: Round;
		round3: Round;
		round4: Round;
		round5: Round;
	};
};

type Round = {
	id: boolean | string;
	status: 'pending' | 'complete' | 'failed';
	guesses: number;
	hints: number;
	points: number;
	values: string[][];
};

/* Request type definitions */
type Fetched = {
	fetched: boolean;
};

type QueryKey = [string, string, string];

type RequestError = Error & {
	status?: number;
};

type Requests = {
	[key: string]: ({ queryKey }: AnswersQueryKey) => Promise<Answers>;
};

type ResponseError = Response & {
	error?: RequestError;
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

	type AnswersQueryKeyType = AnswersQueryKey;

	type AnswersRequestType = AnswersRequest;

	type CategoryListType = CategoryList;

	type CategoriesListType = CategoriesList;

	type DifficultyListType = DifficultyList;

	type GameType = Game;

	type RoundType = Round;

	/* Declare global request types */
	type QueryKeyType = QueryKey;

	type RequestErrorType = RequestError;

	type RequestsType = Requests;

	type ResponseErrorType = ResponseError;

	/* Declare global prop types */
	type ObjectPrimitiveProps = ObjectPrimitive;
}

/* Export global types */
export {};
