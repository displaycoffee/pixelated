/* Local scripts */
import { categoriesUtils } from './categories-utils';

/* Category variables */
const mainCategory = 'video-games';
const subCategory = 'rpgs';
const id = `${mainCategory}-${subCategory}`;

/* Unformatted category questions */
const categoryValues: CategoryValuesUnformattedType = [
	{
		id: 'q1',
		values: [
			['#b2deb4', '#f6ddbd', '#ac1f15', '#ffffff', '#ac1f15'],
			['#d1cdb2', '#f3bea0', '#f1f5e4', '#08306f', '#08306f'],
			['#e5d032', '#f8c3a5', '#6aaadd', '#443184', '#bac1c9'],
			['#e6d037', '#ffdac0', '#605a9f', '#f5f2f5', '#ffffff'],
			['#ebe0a1', '#f5d4b9', '#85bb25', '#f5d4b9', '#ffffff'],
		],
		hexMap: false,
	},
	{
		id: 'q2',
		values: [
			['#f3c86b', '#fdddcf', '#4d4a5b', '#4d4a5b', '#4d4a5b'],
			['#2f2b2c', '#ffc9a6', '#ffffff', '#19100f', '#ffc9a6'],
			['#643f35', '#ffd1ac', '#960e1a', '#e7767c', '#e7767c'],
			['#353331', '#955441', '#76583e', '#313924', '#313924'],
			['#ebc78a', '#e9a888', '#414864', '#4a3d29', '#4a3d29'],
		],
		hexMap: {
			3: { 2: [1, 4] },
		},
	},
	{
		id: 'q3',
		values: [
			['#675650', '#fee6c0', '#ffffff', '#2f2f2f', '#2f2f2f'],
			['#2f2f2f', '#fee0c0', '#7db7d1', '#405ac3', '#fee0c0'],
			['#ffd17f', '#fff1cf', '#b66c4a', '#b66c4a', '#1a1718'],
			['#ffda84', '#fee6c0', '#2f2f2f', '#355d86', '#fee6c0'],
			['#533923', '#efccb4', '#deb45a', '#deb45a', '#efccb4'],
		],
		hexMap: false,
	},
	{
		id: 'q4',
		values: [
			['#f7d273', '#ffeeda', '#0e4e58', '#6aa8d7', '#6aa8d7'],
			['#c18f46', '#000002', '#93caf9', '#93caf9', '#88ded1'],
			['#0f0810', '#fedbc5', '#ffffff', '#f0841d', '#f0841d'],
			['#aeb3bb', '#f6ddbc', '#aeb3bb', '#181818', '#aeb3bb'],
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
			['#e0301b', '#f0b27f', '#0086b1', '#0086b1', '#a1530b'],
			['#ffac3a', '#f1c294', '#e6e4d5', '#e6e4d5', '#e6e4d5'],
			['#51692a', '#f4af7a', '#f97823', '#f97823', '#f4af7a'],
			['#9bbe6a', '#9bbe6a', '#e7ab01', '#e7e6de', '#e7e6de'],
			['#e7ca92', '#f2c29a', '#9994da', '#9994da', '#f2c29a'],
		],
		hexMap: false,
	},
	{
		id: 'q6',
		values: [
			['#b4bcc7', '#fce9da', '#5c7eab', '#ffffff', '#ffffff'],
			['#544138', '#d39d8b', '#343145', '#626f59', '#343145'],
			['#a99573', '#eeb589', '#6b8036', '#624322', '#94652a'],
			['#c4cc70', '#fcc59c', '#9b86b4', '#2a261e', '#ffffff'],
			['#fcdd64', '#eebf74', '#9d461f', '#2b3116', '#79411e'],
		],
		hexMap: false,
	},
	{
		id: 'q7',
		values: [
			['#bd2910', '#ffb59c', '#bdbdbd', '#5284ef', '#bdbdbd'],
			['#63b58c', '#ffb59c', '#5273d6', '#5273d6', '#bdbdbd'],
			['#efde5a', '#ffb59c', '#ffffff', '#00ad08', '#d6b5b5'],
			['#5a84ef', '#ffb59c', '#bdbdbd', '#9c2910', '#bdbdbd'],
			['#4060a0', '#ffb59c', '#bdbdbd', '#b02000', '#bdbdbd'],
		],
		hexMap: false,
	},
	{
		id: 'q8',
		values: [
			['#078bc5', '#f8c3a5', '#9d2522', '#327973', '#94341e'],
			['#e09324', '#f8c3a5', '#f0b12d', '#197679', '#197679'],
			['#f6ca0f', '#f8c3a5', '#f7e9ce', '#6895b2', '#8b481e'],
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
			['#e5c13f', '#f8c3a5', '#2a3d53', '#ffffff', '#ffffff'],
			['#3371b5', '#f8c3a5', '#3a4097', '#161835', '#ffffff'],
			['#7f8dd1', '#f8c3a5', '#2b0f6a', '#ffffff', '#ffffff'],
			['#0e4289', '#f8c3a5', '#26654b', '#a27d37', '#a27d37'],
			['#7296b6', '#f8c3a5', '#9dbf36', '#9dbf36', '#f8c3a5'],
		],
		hexMap: false,
	},
	{
		id: 'q10',
		values: [
			['#5e5061', '#f8c3a5', '#4f4b4c', '#514249', '#8a7c71'],
			['#fab9c1', '#f8c3a5', '#ffffff', '#df7083', '#ffffff'],
			['#9a5f3d', '#f8c3a5', '#b55153', '#ffffff', '#ffffff'],
			['#a97359', '#f8c3a5', '#ffffff', '#dbac44', '#dbac44'],
			['#685e93', '#f8c3a5', '#424c81', '#424c81', '#f8c3a5'],
		],
		hexMap: false,
	},
	{
		id: 'q11',
		values: [
			['#df493e', '#f1ccb0', '#5577b9', '#94b0d9', '#ae9d6a'],
			['#079860', '#f5d1b2', '#d77822', '#cf2d86', '#b42e2e'],
			['#ba74a9', '#f8e8db', '#f5b7b5', '#e56a6b', '#a35a5a'],
			['#7c64a1', '#c2a19a', '#c8c5da', '#443288', '#9c94c4'],
			['#2e271b', '#c5a772', '#f1eed8', '#24965f', '#bfad1b'],
		],
		hexMap: false,
	},
	{
		id: 'q12',
		values: [
			['#ceb783', '#e8d5b4', '#741b21', '#3a302f', '#57362d'],
			['#8e6353', '#eedbd4', '#f4f5ef', '#83aab1', '#643933'],
			['#030106', '#f8cea4', '#291c38', '#a88134', '#271839'],
			['#d0bb8c', '#ead2a2', '#94af68', '#9a7b67', '#8b5843'],
			['#cfd3ee', '#f6dace', '#306a92', '#85bed2', '#dfa75c'],
		],
		hexMap: false,
	},
	{
		id: 'q13',
		values: [
			['#615130', '#ffe19b', '#76703c', '#fff58f', '#2a1911'],
			['#2f6db8', '#fffcdb', '#214776', '#fcfc7a', '#b76d50'],
			['#f2b258', '#e2b25d', '#f9fbfa', '#2b589b', '#f3ed75'],
			['#010101', '#e26a47', '#2b518f', '#f3eedb', '#181415'],
			['#040406', '#f5f6e4', '#e8c7dc', '#31487c', '#3e2f32'],
		],
		hexMap: false,
	},
	{
		id: 'q14',
		values: [
			['#89594d', '#fff4e2', '#cb3445', '#594f67', '#ce3c4e'],
			['#fbe496', '#feeac9', '#fdfcff', '#675f99', '#f8faf7'],
			['#e6eef9', '#f1e3c0', '#8daed9', '#cde1e8', '#504d6b'],
			['#d8e5f6', '#fadfc1', '#eca356', '#583e49', '#f7ffff'],
			['#aa454a', '#fdddc4', '#583a6e', '#aa8bc5', '#faf9ff'],
		],
		hexMap: false,
	},
	{
		id: 'q15',
		values: [
			['#313538', '#fabca1', '#f6eae9', '#3c4a4c', '#4a4e46'],
			['#c2673f', '#f7d9cd', '#fafafc', '#82767c', '#9c6d59'],
			['#40464d', '#f8d8c5', '#cccd7f', '#edaab3', '#b19a9b'],
			['#f1bf87', '#f1b179', '#dc402c', '#8c6a81', '#f8fcff'],
			['#e8dbe0', '#fbe0de', '#c0c387', '#51797e', '#7c4a30'],
		],
		hexMap: false,
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
