/* Type definitions */
type Answers = {
	message: string;
	success: string;
};

type AnswersQueryKey = {
	queryKey: [string, string];
};

type AnswersRequest = [Answers, Statuses];

type Events = SyntheticEvent | Event;

type ObjectString = {
	[key: string]: string;
};

type ObjectPrimitive = {
	[key: string]: string | number | boolean;
};

type RequestError = Error & {
	status?: number;
};

type ResponseError = Response & {
	error?: RequestError;
};

/* Request type definitions */
type Fetched = {
	fetched: boolean;
};

type QueryKey = [string, string];

type Requests = {
	[key: string]: ({ queryKey }: AnswersQueryKey) => Promise<Answers>;
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

	type RequestErrorType = RequestError;

	type ResponseErrorType = ResponseError;

	/* Declare global content types */
	type AnswersType = Answers;

	type AnswersQueryKeyType = AnswersQueryKey;

	type AnswersRequestType = AnswersRequest;

	/* Declare global request types */
	type QueryKeyType = QueryKey;

	type RequestsType = Requests;

	/* Declare global prop types */
	type ObjectPrimitiveProps = ObjectPrimitive;
}

/* Export global types */
export {};
