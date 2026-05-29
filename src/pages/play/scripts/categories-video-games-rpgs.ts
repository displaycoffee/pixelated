/* Scripts */
import { categoriesUtils } from './categories-utils';
import { colors } from './colors';

/* Get colors */
const { black, white, tone1, tone2, tone3, tone4, tone6, tone8 } = colors;

/* Category variables */
const mainCategory = 'video-games';
const subCategory = 'rpgs';
const id = `${mainCategory}-${subCategory}`;

/* Unformatted category questions */
const categoryValues: CategoryValuesUnformattedType = [
	{
		id: 'q1',
		values: [
			['#b2deb4', tone1, '#ac1f15', white, '#ac1f15'],
			['#d1cdb2', tone3, '#f1f5e4', '#08306f', '#08306f'],
			['#e5d032', tone3, '#6aaadd', '#443184', '#bac1c9'],
			['#e6d037', tone3, '#605a9f', '#f5f2f5', white],
			['#ebe0a1', tone2, '#85bb25', '#f5d4b9', white],
		],
		hexMap: false,
	},
	{
		id: 'q2',
		values: [
			['#f3c86b', tone3, '#4d4a5b', '#4d4a5b', '#4d4a5b'],
			['#2f2b2c', tone3, white, '#19100f', '#ffc9a6'],
			['#643f35', tone2, '#960e1a', '#e7767c', '#e7767c'],
			['#353331', tone8, '#76583e', '#313924', '#313924'],
			['#ebc78a', tone4, '#414864', '#4a3d29', '#4a3d29'],
		],
		hexMap: {
			3: { 2: [1, 4] },
		},
	},
	{
		id: 'q3',
		values: [
			['#675650', tone3, white, '#2f2f2f', '#2f2f2f'],
			['#2f2f2f', tone2, '#7db7d1', '#405ac3', tone2],
			['#ffd17f', tone2, '#b66c4a', '#b66c4a', '#1a1718'],
			['#ffda84', tone3, '#2f2f2f', '#355d86', tone3],
			['#533923', tone2, '#deb45a', '#deb45a', tone2],
		],
		hexMap: false,
	},
	{
		id: 'q4',
		values: [
			['#f7d273', tone3, '#0e4e58', '#6aa8d7', '#6aa8d7'],
			['#c18f46', '#000002', '#93caf9', '#93caf9', '#88ded1'],
			['#0f0810', tone2, white, '#f0841d', '#f0841d'],
			['#aeb3bb', tone3, '#aeb3bb', '#181818', '#aeb3bb'],
			['#db4c36', '#f6ffe7', '#db4c36', '#db4c36', '#5d2c0c'],
		],
		hexMap: {
			1: {},
			2: { 2: [2, 3], 3: [1, 2, 3], 4: [1, 2, 3, 5] },
			3: { 2: [1, 4] },
			4: {},
			5: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q5',
		values: [
			['#e0301b', tone3, '#0086b1', '#0086b1', '#a1530b'],
			['#ffac3a', tone2, '#e6e4d5', '#e6e4d5', '#e6e4d5'],
			['#51692a', tone3, '#f97823', '#f97823', tone3],
			['#9bbe6a', '#9bbe6a', '#e7ab01', '#e7e6de', '#e7e6de'],
			['#e7ca92', tone2, '#9994da', '#9994da', tone2],
		],
		hexMap: false,
	},
	{
		id: 'q6',
		values: [
			['#b4bcc7', tone1, '#5c7eab', white, white],
			['#544138', tone4, '#343145', '#626f59', '#343145'],
			['#a99573', tone3, '#6b8036', '#624322', '#94652a'],
			['#c4cc70', tone3, '#9b86b4', '#2a261e', white],
			['#fcdd64', tone3, '#9d461f', '#2b3116', '#79411e'],
		],
		hexMap: false,
	},
	{
		id: 'q7',
		values: [
			['#bd2910', tone3, '#bdbdbd', '#5284ef', '#bdbdbd'],
			['#63b58c', tone3, '#5273d6', '#5273d6', '#bdbdbd'],
			['#efde5a', tone3, white, '#00ad08', '#d6b5b5'],
			['#5a84ef', tone1, '#bdbdbd', '#9c2910', '#bdbdbd'],
			['#4060a0', tone3, '#bdbdbd', '#b02000', '#bdbdbd'],
		],
		hexMap: false,
	},
	{
		id: 'q8',
		values: [
			['#078bc5', tone3, '#9d2522', '#327973', '#94341e'],
			['#e09324', tone2, '#f0b12d', '#197679', '#197679'],
			['#f6ca0f', tone3, '#f7e9ce', '#6895b2', '#8b481e'],
			['#9db8d8', '#9db8d8', '#deebf9', '#9db8d8', '#000543'],
			['#a6a4a0', '#a6a4a0', '#a6a4a0', '#a6a4a0', '#4b4b48'],
		],
		hexMap: {
			5: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q9',
		values: [
			['#e5c13f', tone3, '#2a3d53', white, white],
			['#3371b5', tone2, '#3a4097', '#161835', white],
			['#7f8dd1', tone2, '#2b0f6a', white, white],
			['#0e4289', tone3, '#26654b', '#a27d37', '#a27d37'],
			['#7296b6', tone3, '#9dbf36', '#9dbf36', tone3],
		],
		hexMap: false,
	},
	{
		id: 'q10',
		values: [
			['#5e5061', tone3, '#4f4b4c', '#514249', '#8a7c71'],
			['#fab9c1', tone2, white, '#df7083', white],
			['#9a5f3d', tone3, '#b55153', white, white],
			['#a97359', tone3, white, '#dbac44', '#dbac44'],
			['#685e93', tone2, '#424c81', '#424c81', tone2],
		],
		hexMap: false,
	},
	{
		id: 'q11',
		values: [
			['#e7633b', tone3, '#2f4496', '#2f4496', white],
			['#01a75f', tone3, '#d27627', '#cc2781', '#ba2b25'],
			['#b975a9', tone2, '#f6b7b5', '#f6b7b5', '#f6b7b5'],
			['#7a669c', tone1, '#c7c4d9', '#c7c4d9', '#443384'],
			['#544433', tone6, '#89673a', '#1b995a', '#1b995a'],
		],
		hexMap: {
			4: { 3: [1, 3, 5] },
			5: { 2: [1, 4] },
		},
	},
	{
		id: 'q12',
		values: [
			['#ceb783', tone3, '#741b21', '#3a302f', '#57362d'],
			['#8e6353', tone2, '#f4f5ef', '#83aab1', tone2],
			[black, tone3, '#291c38', '#291c38', '#291c38'],
			['#d0bb8c', tone3, '#94af68', '#9a7b67', '#8b5843'],
			['#cfd3ee', tone2, '#306a92', '#85bed2', '#306a92'],
		],
		hexMap: false,
	},
	{
		id: 'q13',
		values: [
			['#854a38', tone3, '#4e613d', '#d08f41', '#d08f41'],
			['#5490c6', tone2, '#042c5f', '#f2f369', '#893e1f'],
			['#f2b258', tone3, white, '#2b589b', white],
			[black, tone6, '#364e96', white, black],
			[black, tone2, '#f8b9ca', '#f8b9ca', '#f8b9ca'],
		],
		hexMap: {
			3: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q14',
		values: [
			['#945d56', tone3, '#c0525d', '#44424f', '#c0525d'],
			['#f3ecb6', tone2, white, white, '#515082'],
			['#eee8f1', tone1, '#a3b2cd', '#a3b2cd', '#a3b2cd'],
			['#eee8f1', tone1, '#da8c76', '#da8c76', '#54464b'],
			['#46434e', tone2, '#cac4de', '#cac4de', '#46434e'],
		],
		hexMap: {
			2: { 3: [1, 3, 5] },
			4: { 3: [1, 3, 5] },
			5: { 3: [1, 3, 5] },
		},
	},
	{
		id: 'q15',
		values: [
			['#4b433f', tone4, white, '#41564f', '#41564f'],
			['#bb673d', tone2, white, '#6b625e', '#9f6d5e'],
			[black, tone2, '#cccd7f', '#edaab3', '#cccd7f'],
			['#f1bf87', tone4, '#7c646e', white, white],
			['#e8dadc', tone2, '#578288', '#578288', '#71502e'],
		],
		hexMap: {
			2: { 3: [1, 3, 5] },
			3: { 3: [1, 3, 5] },
			4: { 2: [1, 4] },
		},
	},
];

/* Format category question values */
const values: CategoryQuestionsType = categoriesUtils.buildValues(categoryValues);

/* Category list */
const categoryList: CategoryValuesType = {
	name: 'Video Games - RPGs',
	id: id,
	category: mainCategory,
	subCategory: subCategory,
	description: 'Characters from video game RPGs.',
	values: values,
};

/* Category list */
export const category = categoryList;
