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
		const questionId = queryKey[1];
		const guess = queryKey[2];

		// Storage for answers data
		let answers = {} as AnswersType;

		// Set options
		const options = {
			...parameters.options(),
			body: JSON.stringify({ questionId: questionId, guess }),
		};

		// Fetch answers
		const response = await fetch(`${variables.paths.api}/validate`, options);
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
		const hintId = queryKey[1];

		// Storage for hints data
		let hints = {} as HintsType;

		// Set options
		const options = {
			...parameters.options(),
			body: JSON.stringify({ hintId: hintId }),
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
