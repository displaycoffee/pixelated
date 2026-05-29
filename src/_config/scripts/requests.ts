/* React */
import { QueryFunctionContext } from '@tanstack/react-query';

/* Local scripts */
import { variables } from './variables';

/* Setup parameters to pass to fetches */
const parameters = {
	options: () => {
		return {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		};
	},
};

/* If the API returns an error (401, 404, etc.), throw an error to trigger retry logic in QueryClientProvider */
const throwError = (json: ResponseErrorType) => {
	if (json?.error) {
		throw new Error(json.error);
	}
};

export const requests: RequestsType = {
	answers: async ({ queryKey }: QueryFunctionContext) => {
		// queryKey: ['answers', categoryType (JSON), questionId, guess, guessNumber]
		const { category, subCategory } = JSON.parse(queryKey[1] as string) as CategoryType;
		const questionId = queryKey[2] as string;
		const guess = queryKey[3] as string;
		const guessNumber = parseInt(queryKey[4] as string, 10);

		// Storage for answers data
		let answers = {} as AnswersType;

		// Set options
		const options = {
			...parameters.options(),
			body: JSON.stringify({ category, subCategory, questionId, guess, guessNumber }),
		};

		// Fetch answers
		const response = await fetch(`${variables.paths.api}/answers`, options);
		const json = await response.json();

		// Check for API errors
		throwError(json);

		// Set answer
		if (typeof json?.success == 'boolean' && typeof json?.message == 'string') {
			answers = json;
		}

		return answers;
	},
	hints: async ({ queryKey }: QueryFunctionContext) => {
		// queryKey: ['hints', categoryType (JSON), questionId, hintId]
		const { category, subCategory } = JSON.parse(queryKey[1] as string) as CategoryType;
		const questionId = queryKey[2] as string;
		const hintId = queryKey[3] as string;

		// Storage for hints data
		let hints = {} as HintsType;

		// Set options
		const options = {
			...parameters.options(),
			body: JSON.stringify({ category, subCategory, questionId, hintId }),
		};

		// Fetch answers
		const response = await fetch(`${variables.paths.api}/hints`, options);
		const json = await response.json();

		// Check for API errors
		throwError(json);

		// Set answer
		if (typeof json?.message == 'string') {
			hints = json;
		}

		return hints;
	},
};
