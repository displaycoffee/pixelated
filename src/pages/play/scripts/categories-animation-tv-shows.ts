/* Local scripts */
import { categoriesUtils } from './categories-utils';

/* Category variables */
const mainCategory = 'animation';
const subCategory = 'tv-shows';
const id = `${mainCategory}-${subCategory}`;

/* Unformatted category questions */
const categoryValues: CategoryValuesUnformattedType = [
	{
		id: 'q1',
		values: [
			['#d46d0e', '#f6b484', '#991f1e', '#327484', '#327484'],
			['#612469', '#f4a981', '#ffffff', '#000000', '#252621'],
			['#7d9c9f', '#7d9c9f', '#7d9c9f', '#5a7b82', '#5a7b82'],
			['#ecc385', '#ecc385', '#89b59c', '#58655c', '#58655c'],
			['#000000', '#dfaf6f', '#fe92aa', '#fe92aa', '#772529'],
		],
		hexMap: {
			2: { 2: [1, 4] },
			3: { 1: [4], 2: [1, 4] },
			4: { 2: [1, 4] },
		},
	},
	{
		id: 'q2',
		values: [
			['#242424', '#ffb27e', '#ffffff', '#787878', '#787878'],
			['#242424', '#ffb17f', '#de564a', '#3465a8', '#3465a8'],
			['#242424', '#ffb17f', '#98b7ed', '#234c72', '#ffffff'],
			['#242424', '#ffb27e', '#fcde62', '#818eb8', '#ffb27e'],
			['#f873aa', '#ffb27e', '#96a349', '#96a349', '#ffb27e'],
		],
		hexMap: false,
	},
	{
		id: 'q3',
		values: [
			['#ffd51f', '#ffd51f', '#ffffff', '#68aee1', '#68aee1'],
			['#017cc2', '#ffd51f', '#c7e09c', '#c7e09c', '#c7e09c'],
			['#ffd51f', '#ffd51f', '#f15c31', '#009dde', '#009dde'],
			['#ffd51f', '#ffd51f', '#ed5c34', '#ed5c34', '#ed5c34'],
			['#ffd51f', '#ffd51f', '#68cef6', '#68cef6', '#68cef6'],
		],
		hexMap: false,
	},
	{
		id: 'q4',
		values: [
			['#e9ccbe', '#e9ccbe', '#81b046', '#ad836a', '#ffffff'],
			['#6a8799', '#6a8799', '#d5dce6', '#6a8799', '#6a8799'],
			['#67869c', '#67869c', '#dd473f', '#fee83a', '#fee83a'],
			['#f6e53b', '#d47d49', '#428ac8', '#428ac8', '#d47d49'],
			['#ce4c2b', '#c3cf5e', '#000000', '#4880bd', '#4880bd'],
		],
		hexMap: {
			2: { 3: [1, 2, 4] },
		},
	},
	{
		id: 'q5',
		values: [
			['#525d97', '#ffddb4', '#b96658', '#b96658', '#525d97'],
			['#5ebc42', '#ffddb4', '#f26020', '#f26020', '#446b62'],
			['#4cb2c7', '#ffddb4', '#ec1c40', '#ec1c40', '#7a402e'],
			['#f15f27', '#ffddb4', '#f15f27', '#f15f27', '#f15f27'],
			['#f7f407', '#ffddb4', '#6cc7b5', '#6cc7b5', '#2d6347'],
		],
		hexMap: {
			1: { 3: [1, 3, 5] },
			2: { 3: [1, 3, 5] },
			3: { 3: [1, 3, 5] },
			5: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q6',
		values: [
			['#803919', '#fab5a5', '#ffffff', '#2d6633', '#2d6633'],
			['#f47a53', '#fecba0', '#5cc2aa', '#d0ba95', '#d0ba95'],
			['#7c3a1a', '#fecba0', '#d96386', '#4174b5', '#4174b5'],
			['#fcf396', '#f9b6a3', '#6174b8', '#4d4948', '#4d4948'],
			['#fad8bc', '#fad8bc', '#fcdd80', '#df254c', '#df254c'],
		],
		hexMap: false,
	},
	{
		id: 'q7',
		values: [
			['#b8d5e5', '#d1cac0', '#addcd4', '#73643d', '#73643d'],
			['#78512a', '#edbfa8', '#fcfd88', '#2f3857', '#2f3857'],
			['#6c5756', '#e6bca4', '#5d6e38', '#97b3cb', '#97b3cb'],
			['#f1d58b', '#f5dad3', '#da515b', '#333d82', '#333d82'],
			['#d2914d', '#eac7b4', '#cc6cc5', '#ffffff', '#ffffff'],
		],
		hexMap: false,
	},
	{
		id: 'q8',
		values: [
			['#fd7110', '#fddcc9', '#fe7496', '#fe7496', '#ffffff'],
			['#000000', '#fddcc9', '#75ba5f', '#75ba5f', '#ffffff'],
			['#fde15a', '#fddcc9', '#68b1da', '#68b1da', '#ffffff'],
			['#000000', '#fddcc9', '#ffffff', '#ffffff', '#000000'],
			['#ffffff', '#b1d140', '#0162b1', '#0162b1', '#ffffff'],
		],
		hexMap: {
			1: { 3: [1, 3, 5] },
			2: { 3: [1, 3, 5] },
			3: { 3: [1, 3, 5] },
			5: { 3: [1, 2, 3], 4: [1, 2, 3, 5] },
		},
	},
	{
		id: 'q9',
		values: [
			['#b5cb8b', '#b5cb8b', '#ef1262', '#ef1262', '#000000'],
			['#c7c8ca', '#c7c8ca', '#35bcbf', '#c7c8ca', '#c7c8ca'],
			['#000000', '#f8efd0', '#0660aa', '#000000', '#000000'],
			['#551e72', '#f0e5e1', '#000000', '#000000', '#7d0350'],
			['#000000', '#f7cdaf', '#ffffff', '#ffffff', '#000000'],
		],
		hexMap: {
			1: { 3: [1, 3, 5] },
			4: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q10',
		values: [
			['#000000', '#ffffff', '#000000', '#d3ab86', '#d3ab86'],
			['#d43031', '#ffffff', '#a8d9ed', '#a8d9ed', '#000000'],
			['#000000', '#ffffff', '#000000', '#fbaea8', '#000000'],
			['#ffffff', '#79bee6', '#ffffff', '#ffffff', '#ffffff'],
			['#ffffff', '#e3b7b8', '#ffffff', '#ffffff', '#ffffff'],
		],
		hexMap: {
			4: { 3: [1, 2, 4], 4: [1, 2, 4, 5] },
			5: { 3: [1, 2, 4], 4: [1, 2, 4, 5] },
		},
	},
	{
		id: 'q11',
		values: [
			['#9ca3ab', '#9ca3ab', '#ffffff', '#9ca3ab', '#ffffff'],
			['#000000', '#f89c2e', '#000000', '#000000', '#f89c2e'],
			['#000000', '#ffffff', '#ffffff', '#000000', '#ffffff'],
			['#f5bbad', '#f5bbad', '#2e70c7', '#f5bbad', '#f5bbad'],
			['#a86744', '#f9c9a2', '#a86744', '#a86744', '#620205'],
		],
		hexMap: {
			2: { 2: [1, 5], 3: [1, 3, 5], 4: [1, 2, 4, 5] },
			5: { 2: [1, 5], 3: [1, 3, 5] },
		},
	},
	{
		id: 'q12',
		values: [
			['#3ec4de', '#3ec4de', '#ee2c23', '#3ec4de', '#3ec4de'],
			['#f6b1bc', '#f6b1bc', '#fee517', '#b2b1d1', '#f6b1bc'],
			['#009172', '#f5ae39', '#ffffff', '#009172', '#f5ae39'],
			['#fbd6c4', '#fbd6c4', '#0173a8', '#0173a8', '#0173a8'],
			['#8696be', '#f4e0c7', '#f4e0c7', '#8696be', '#8696be'],
		],
		hexMap: {
			3: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q13',
		values: [
			['#87493a', '#297a98', '#87493a', '#87493a', '#87493a'],
			['#85583b', '#f0baa9', '#648e65', '#571820', '#571820'],
			['#f6d68a', '#f4beac', '#ffffff', '#2863c6', '#2863c6'],
			['#cd4843', '#ecbaab', '#322776', '#322776', '#df6fba'],
			['#58151e', '#e2b6a4', '#ce6538', '#95112e', '#ce6538'],
		],
		hexMap: {
			2: { 3: [1, 2, 5], 4: [1, 2, 4, 5] },
			4: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q14',
		values: [
			['#fcf614', '#fcf614', '#ffffff', '#bd6f3b', '#ffffff'],
			['#ff9285', '#ff9285', '#b1e835', '#ff9285', '#ff9285'],
			['#c1e1d4', '#c1e1d4', '#b78c26', '#c1e1d4', '#c1e1d4'],
			['#cdebaf', '#f84a3f', '#9ecdeb', '#8074c0', '#8074c0'],
			['#d58f58', '#fcf3bc', '#ffffff', '#ffffff', '#d2d5de'],
		],
		hexMap: {
			1: { 4: [1, 2, 3, 4] },
			2: { 4: [1, 2, 3, 4] },
			3: { 4: [1, 2, 3, 4] },
			4: { 1: [2], 2: [1, 2], 3: [1, 2, 4], 4: [1, 2, 3, 4] },
		},
	},
	{
		id: 'q15',
		values: [
			['#ffffff', '#fbe0cf', '#10aed4', '#0a64d2', '#fbe0cf'],
			['#f8cc11', '#ffffff', '#f8cc11', '#f8cc11', '#f8cc11'],
			['#fe66cb', '#ffcdfe', '#ff00cd', '#ff00cd', '#ff00cd'],
			['#fdcd00', '#abddfe', '#ffffff', '#0000fe', '#0000fe'],
			['#000000', '#e9eff1', '#a09fa4', '#232f86', '#5d202f'],
		],
		hexMap: {
			4: { 1: [5] },
		},
	},
];

/* Format category question values */
const values: CategoryQuestionsType = categoriesUtils.buildValues(categoryValues);

/* Category list */
const categoryList: CategoryValuesType = {
	name: 'Animation - TV Shows',
	id: id,
	category: mainCategory,
	subCategory: subCategory,
	description: 'Characters based on animated television shows (not anime).',
	values: values,
};

/* Category list */
export const category = categoryList;
