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
		const error = new Error(json.error.message || 'API Error');
		(error as RequestErrorType).status = json.error.status;
		throw error;
	}
};

export const requests: RequestsType = {
	answers: async ({ queryKey }: AnswersQueryKeyType) => {
		const guess = queryKey[1];

		// Storage for answers data
		let answers = {} as AnswersType;

		// Set options
		const options = {
			...parameters.options(),
			body: JSON.stringify({ questionId: 'q1', guess }),
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
};
