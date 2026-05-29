/* Local scripts */
import { categoriesUtils } from './categories-utils';
import { colors } from './colors';

/* Get colors */
const { black, white, tone1, tone2, tone3, tone4, tone5 } = colors;

/* Category variables */
const mainCategory = 'animation';
const subCategory = 'tv-shows';
const id = `${mainCategory}-${subCategory}`;

/* Unformatted category questions */
const categoryValues: CategoryValuesUnformattedType = [
	{
		id: 'q1',
		values: [
			['#d46d0e', tone3, '#991f1e', '#327484', '#327484'],
			['#612469', tone3, white, black, '#252621'],
			['#7d9c9f', '#7d9c9f', '#7d9c9f', '#5a7b82', '#5a7b82'],
			[tone2, tone2, '#89b59c', '#58655c', '#58655c'],
			[black, tone4, '#fe92aa', '#fe92aa', '#772529'],
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
			['#242424', tone3, white, '#787878', '#787878'],
			['#242424', tone2, '#de564a', '#3465a8', '#3465a8'],
			['#242424', tone2, '#98b7ed', '#234c72', white],
			['#242424', tone3, '#fcde62', '#818eb8', tone3],
			['#f873aa', tone3, '#96a349', '#96a349', tone3],
		],
		hexMap: false,
	},
	{
		id: 'q3',
		values: [
			['#ffd51f', '#ffd51f', white, '#68aee1', '#68aee1'],
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
			[tone2, tone2, '#81b046', '#ad836a', white],
			['#6a8799', '#6a8799', '#d5dce6', '#6a8799', '#6a8799'],
			['#67869c', '#67869c', '#dd473f', '#fee83a', '#fee83a'],
			['#f6e53b', tone5, '#428ac8', '#428ac8', tone5],
			['#ce4c2b', '#c3cf5e', black, '#4880bd', '#4880bd'],
		],
		hexMap: {
			2: { 3: [1, 2, 4] },
		},
	},
	{
		id: 'q5',
		values: [
			['#525d97', tone2, '#b96658', '#b96658', '#525d97'],
			['#5ebc42', tone2, '#f26020', '#f26020', '#446b62'],
			['#4cb2c7', tone2, '#ec1c40', '#ec1c40', '#7a402e'],
			['#f15f27', tone2, '#f15f27', '#f15f27', '#f15f27'],
			['#f7f407', tone2, '#6cc7b5', '#6cc7b5', '#2d6347'],
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
			['#803919', tone3, white, '#2d6633', '#2d6633'],
			['#f47a53', tone2, '#5cc2aa', '#d0ba95', '#d0ba95'],
			['#7c3a1a', tone2, '#d96386', '#4174b5', '#4174b5'],
			['#fcf396', tone3, '#6174b8', '#4d4948', '#4d4948'],
			[tone2, tone2, '#fcdd80', '#df254c', '#df254c'],
		],
		hexMap: false,
	},
	{
		id: 'q7',
		values: [
			['#b8d5e5', '#d1cac0', '#addcd4', '#73643d', '#73643d'],
			['#78512a', tone3, '#fcfd88', '#2f3857', '#2f3857'],
			['#6c5756', tone3, '#5d6e38', '#97b3cb', '#97b3cb'],
			['#f1d58b', tone2, '#da515b', '#333d82', '#333d82'],
			['#d2914d', tone3, '#cc6cc5', white, white],
		],
		hexMap: false,
	},
	{
		id: 'q8',
		values: [
			['#fd7110', tone2, '#fe7496', '#fe7496', white],
			[black, tone2, '#75ba5f', '#75ba5f', white],
			['#fde15a', tone2, '#68b1da', '#68b1da', white],
			[black, tone2, white, white, black],
			[white, '#b1d140', '#0162b1', '#0162b1', white],
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
			['#b5cb8b', '#b5cb8b', '#ef1262', '#ef1262', black],
			['#c7c8ca', '#c7c8ca', '#35bcbf', '#c7c8ca', '#c7c8ca'],
			[black, tone1, '#0660aa', black, black],
			['#551e72', tone1, black, black, '#7d0350'],
			[black, tone2, white, white, black],
		],
		hexMap: {
			1: { 3: [1, 3, 5] },
			4: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q10',
		values: [
			[black, white, black, '#d3ab86', '#d3ab86'],
			['#d43031', white, '#a8d9ed', '#a8d9ed', black],
			[black, white, black, '#fbaea8', black],
			[white, '#79bee6', white, white, white],
			[white, '#e3b7b8', white, white, white],
		],
		hexMap: {
			4: { 3: [1, 2, 4], 4: [1, 2, 4, 5] },
			5: { 3: [1, 2, 4], 4: [1, 2, 4, 5] },
		},
	},
	{
		id: 'q11',
		values: [
			['#9ca3ab', '#9ca3ab', white, '#9ca3ab', white],
			[black, '#f89c2e', black, black, '#f89c2e'],
			[black, white, white, black, white],
			['#f5bbad', '#f5bbad', '#2e70c7', '#f5bbad', '#f5bbad'],
			['#a86744', tone3, '#a86744', '#a86744', '#620205'],
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
			['#009172', '#f5ae39', white, '#009172', '#f5ae39'],
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
			['#85583b', tone3, '#648e65', '#571820', '#571820'],
			['#f6d68a', tone3, white, '#2863c6', '#2863c6'],
			['#cd4843', tone3, '#322776', '#322776', '#df6fba'],
			['#58151e', tone3, '#ce6538', '#95112e', '#ce6538'],
		],
		hexMap: {
			2: { 3: [1, 2, 5], 4: [1, 2, 4, 5] },
			4: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q14',
		values: [
			['#fcf614', '#fcf614', white, '#bd6f3b', white],
			['#ff9285', '#ff9285', '#b1e835', '#ff9285', '#ff9285'],
			['#c1e1d4', '#c1e1d4', '#b78c26', '#c1e1d4', '#c1e1d4'],
			['#cdebaf', '#f84a3f', '#9ecdeb', '#8074c0', '#8074c0'],
			['#d58f58', '#fcf3bc', white, white, '#d2d5de'],
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
			[white, tone2, '#10aed4', '#0a64d2', tone2],
			['#f8cc11', white, '#f8cc11', '#f8cc11', '#f8cc11'],
			['#fe66cb', '#ffcdfe', '#ff00cd', '#ff00cd', '#ff00cd'],
			['#fdcd00', '#abddfe', white, '#0000fe', '#0000fe'],
			[black, '#e9eff1', '#a09fa4', '#232f86', '#5d202f'],
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
