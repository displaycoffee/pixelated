/* Local scripts */
import { categoriesUtils } from './categories-utils';
import { colors } from './colors';

/* Get colors */
const { black, white, tone1, tone2, tone3, tone4, tone5, tone7 } = colors;

/* Category variables */
const mainCategory = 'animation';
const subCategory = 'movies';
const id = `${mainCategory}-${subCategory}`;

/* Unformatted category questions */
const categoryValues: CategoryValuesUnformattedType = [
	{
		id: 'q1',
		values: [
			['#5a2019', tone3, '#308ec3', white, '#308ec3'],
			['#5f3801', '#844f2d', '#6a0604', '#391b1e', '#844f2d'],
			[black, tone5, '#8b0002', '#32251f', '#732b1f'],
			['#feed73', '#feed73', '#f4b100', '#f4b100', '#f4b100'],
			['#b0421c', '#f9ded9', '#563736', '#b0421c', '#b0421c'],
		],
		hexMap: {
			4: { 1: [3] },
			5: { 1: [4], 2: [3, 4], 3: [2, 3, 4], 4: [2, 3, 4, 5] },
		},
	},
	{
		id: 'q2',
		values: [
			['#c02813', tone3, '#a8a3cb', '#49a981', '#86d6a3'],
			['#f36f47', '#f36f47', '#ec3716', '#ec3716', '#d81008'],
			['#f0dd25', '#4ea0dc', '#f0dd25', '#f0dd25', '#8bd3f6'],
			['#eae8eb', '#bbbdd6', black, black, black],
			[black, tone4, white, '#3a4d53', black],
		],
		hexMap: {
			1: { 2: [1, 4] },
			2: { 1: [3], 3: [1, 3, 5] },
			3: { 2: [1, 2], 3: [1, 2, 5], 4: [1, 2, 3, 5] },
			4: { 1: [2], 2: [2, 5], 3: [1, 2, 5], 4: [1, 2, 3, 4] },
		},
	},
	{
		id: 'q3',
		values: [
			['#bda371', '#ab8e60', '#f7b739', '#f7b739', '#523a28'],
			[white, black, white, white, white],
			['#d6312c', white, black, white, black],
			[white, tone3, white, white, tone3],
			['#cf8045', '#7e3f22', '#7e3f22', '#8b502f', '#8b502f'],
		],
		hexMap: {
			1: { 1: [3], 3: [1, 2, 4], 4: [1, 2, 4, 5] },
			2: { 2: [2, 3], 3: [1, 2, 4], 4: [1, 2, 4, 5] },
			3: { 2: [1, 2], 3: [1, 2, 5], 4: [1, 2, 4, 5] },
			4: { 2: [2, 3], 3: [1, 2, 3] },
			5: { 1: [3], 3: [1, 2, 3] },
		},
	},
	{
		id: 'q4',
		values: [
			['#a03722', tone3, '#f7ab36', '#4a8ac6', '#933d25'],
			['#92318f', tone3, '#55ac4d', white, white],
			['#7c9350', '#f6fcd2', '#f6fcd2', '#7c9350', '#7c9350'],
			['#ffb280', '#ffb280', '#ffb280', '#ffb280', black],
			['#f68d0c', '#ffc53b', '#f68d0c', '#dfc496', '#f68d0c'],
		],
		hexMap: {
			4: { 2: [1, 5], 3: [1, 3, 5] },
			5: { 2: [1, 2], 3: [1, 2, 4], 4: [1, 2, 4, 5] },
		},
	},
	{
		id: 'q5',
		values: [
			[black, tone7, '#8d298b', '#fedbad', tone7],
			[black, tone7, '#87dbff', '#87dbff', '#87dbff'],
			['#77a5fa', '#77a5fa', '#bd314c', '#655fdd', '#655fdd'],
			['#8e3428', '#c1655a', '#610043', '#8e3428', '#8e3428'],
			[black, tone7, '#84281c', black, black],
		],
		hexMap: {
			3: { 2: [1, 4], 4: [1, 2, 3, 4] },
			4: { 2: [2, 4], 3: [2, 3, 4], 4: [1, 2, 3, 4] },
		},
	},
	{
		id: 'q6',
		values: [
			['#2a1608', tone2, '#626d4b', '#373324', '#5b4025'],
			['#1a1e20', '#8b9a7c', '#1a1e20', '#1a1e20', '#1a1e20'],
			['#f9eaa5', tone2, '#7c7960', '#8a564b', '#292011'],
			['#2a2c22', tone3, '#a24e21', '#625f5a', '#22413b'],
			['#2d2926', tone3, '#736544', '#5e4c3c', '#403a31'],
		],
		hexMap: {
			2: { 3: [1, 2, 4], 4: [1, 2, 4, 5] },
			3: { 2: [1, 4] },
			4: { 1: [3], 2: [3, 5], 3: [1, 3, 5] },
			5: { 1: [3], 2: [3, 4] },
		},
	},
	{
		id: 'q7',
		values: [
			[white, black, white, black, black],
			['#9f2d34', '#e3eef4', '#dba8c6', '#ac7795', '#e3eef4'],
			['#992a32', white, '#992a32', '#992a32', black],
			['#bd7e99', white, '#bd7e99', '#bd7e99', black],
			['#3e4941', white, black, black, white],
		],
		hexMap: {
			1: { 2: [1, 2], 3: [1, 2, 4], 4: [1, 2, 3, 5] },
			3: { 2: [1, 5], 3: [1, 3, 5], 4: [1, 2, 3, 5] },
			4: { 2: [1, 5], 3: [1, 3, 5], 4: [1, 2, 3, 5] },
			5: { 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 3, 5] },
		},
	},
	{
		id: 'q8',
		values: [
			['#8ae4ea', '#8ae4ea', '#6c5f93', '#8ae4ea', '#8ae4ea'],
			['#b8cf69', white, '#b8cf69', '#b8cf69', '#b8cf69'],
			['#2c2425', tone2, '#e3b2af', '#e3b2af', '#a47fb4'],
			['#a08ba8', '#bbabc1', '#bbabc1', '#a08ba8', '#a08ba8'],
			['#a387b3', '#c08ab0', '#78b764', '#78b764', '#c08ab0'],
		],
		hexMap: {
			1: { 2: [1, 4] },
			2: { 3: [1, 2, 4], 4: [1, 2, 4, 5] },
			3: { 1: [3], 3: [1, 3, 5] },
			4: { 2: [1, 4] },
			5: { 3: [1, 3, 5], 4: [1, 2, 4, 5] },
		},
	},
	{
		id: 'q9',
		values: [
			['#74d8ff', white, '#74d8ff', '#74d8ff', '#74d8ff'],
			['#cffc11', white, '#8896f9', '#8896f9', '#8896f9'],
			['#1e1b1a', '#f0f0b3', '#9e9a82', '#9e9a82', '#1e1b1a'],
			['#1c1527', '#b9d1ed', '#1c1527', '#962c30', '#1c1527'],
			['#7ca351', '#daff8b', '#7ca351', '#7ca351', '#7ca351'],
		],
		hexMap: {
			1: { 4: [1, 2, 3, 5] },
			2: { 1: [3], 4: [1, 2, 3, 5] },
			3: { 1: [3], 2: [2, 3], 3: [2, 3, 5], 4: [1, 2, 3, 5] },
			4: { 2: [2, 3], 3: [1, 2, 5], 4: [1, 2, 3, 5] },
			5: { 3: [1, 2, 5], 4: [1, 2, 3, 5] },
		},
	},
	{
		id: 'q10',
		values: [
			['#bf933c', '#ae4b3c', '#7c7936', '#7c7936', '#ae4b3c'],
			['#7a7965', '#a05e3a', '#7a7965', '#7a7965', '#a05e3a'],
			['#dbacce', '#ae4b3c', '#ad5ca8', '#d4acea', '#d4acea'],
			['#735547', '#896c68', '#684b29', '#684b29', '#684b29'],
			['#6d220b', '#473c40', '#732c0e', '#732c0e', '#473c40'],
		],
		hexMap: {
			1: { 1: [3], 3: [1, 3, 5] },
			2: { 3: [1, 3, 5] },
			4: { 1: [3], 3: [1, 2, 4] },
			5: { 1: [3], 3: [2, 3, 4], 4: [1, 2, 4, 5] },
		},
	},
	{
		id: 'q11',
		values: [
			['#fd6d2e', white, '#fd6d2e', white, '#fd6d2e'],
			['#fd6d2e', white, '#fd6d2e', white, '#fd6d2e'],
			['#0538eb', '#030522', '#0538eb', '#030522', '#fde75c'],
			[white, '#201a40', '#fedd65', '#201a40', '#201a40'],
			['#f1e2c0', '#f48217', '#f1e2c0', '#220600', '#220600'],
		],
		hexMap: {
			1: { 2: [1, 2], 3: [1, 2, 5], 4: [1, 2, 3, 5] },
			2: { 2: [1, 2], 3: [1, 2, 5], 4: [1, 2, 3, 5] },
			3: { 2: [1, 2], 3: [1, 2, 5], 4: [1, 2, 3, 5] },
			4: { 1: [2], 2: [1, 2], 3: [1, 2, 3], 4: [1, 2, 3, 5] },
			5: { 1: [2], 2: [2, 5], 3: [1, 2, 5], 4: [1, 2, 4, 5] },
		},
	},
	{
		id: 'q12',
		values: [
			['#3e83db', tone1, '#f0f973', '#f0f973', tone1],
			['#1b73c1', '#82d4f9', white, white, '#0b3677'],
			['#326f0d', '#aabd6f', '#4bba85', '#4bba85', '#143d2d'],
			['#a32101', '#a32101', '#e6d2ca', '#513337', '#513337'],
			['#ab8ebc', '#ab8ebc', white, '#423b68', '#423b68'],
		],
		hexMap: {
			1: { 3: [1, 3, 5] },
			2: { 3: [1, 3, 5] },
			3: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q13',
		values: [
			['#b1b629', '#b1b629', '#daceac', '#daceac', '#ab6406'],
			['#a07f70', '#e0c5b1', '#e0c5b1', '#a07f70', '#a07f70'],
			['#773a24', tone3, '#2e703b', '#034722', '#034722'],
			['#b50124', tone4, '#b50124', '#403935', '#383027'],
			['#cd832a', '#cd832a', '#cd832a', '#cd832a', '#cd832a'],
		],
		hexMap: {
			1: { 3: [1, 3, 5] },
			2: { 2: [2, 4] },
			3: { 2: [1, 4] },
			4: { 2: [1, 4], 3: [1, 4, 5] },
		},
	},
	{
		id: 'q14',
		values: [
			['#b31e00', '#b84601', '#ff8827', '#b84601', '#b84601'],
			['#ae1f02', '#d57131', '#eba768', '#eba768', '#d57131'],
			[black, '#8c2e24', '#f36d54', '#8c2e24', '#8c2e24'],
			[black, '#782f1c', '#a06257', '#782f1c', '#782f1c'],
			['#d87534', '#ba6934', '#ba6934', '#d87534', '#d87534'],
		],
		hexMap: {
			1: { 2: [1, 2], 4: [1, 2, 3, 5] },
			2: { 1: [2], 2: [2, 3], 3: [2, 3, 5], 4: [1, 2, 3, 5] },
			3: { 1: [2], 2: [1, 2], 3: [1, 2, 4], 4: [1, 2, 3, 5] },
			4: { 2: [1, 2], 3: [1, 2, 3], 4: [1, 2, 3, 5] },
			5: { 4: [1, 2, 3, 5] },
		},
	},
	{
		id: 'q15',
		values: [
			[black, tone5, '#e91147', white, '#e91147'],
			['#405984', '#659faa', '#659faa', '#405984', '#405984'],
			[black, tone5, '#97cdb5', '#86a9bf', tone5],
			['#614f83', '#d47d9d', '#d47d9d', '#4a484b', '#1b201b'],
			['#fde0b8', '#374983', '#374983', '#fde0b8', '#fde0b8'],
		],
		hexMap: {
			3: { 2: [1, 4] },
			5: { 4: [1, 2, 3, 5] },
		},
	},
];

/* Format category question values */
const values: CategoryQuestionsType = categoriesUtils.buildValues(categoryValues);

/* Category list */
const categoryList: CategoryValuesType = {
	name: 'Animation - Movies',
	id: id,
	category: mainCategory,
	subCategory: subCategory,
	description: 'Characters based on animated movies (not anime).',
	values: values,
};

/* Category list */
export const category = categoryList;
