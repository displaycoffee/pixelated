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
			['#b2deb4', '#f6ddbd', '#ac1f15', '#f6ddbd', '#ac1f15'],
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
			['#a2acb4', '#fce9df', '#5d82aa', '#fcf8f5', '#5f7db1'],
			['#3f3131', '#d49b88', '#2f2d3b', '#5b6950', '#595764'],
			['#7f6a53', '#ffc99b', '#5b6930', '#684125', '#8e5a22'],
			['#cad26b', '#f9c29c', '#9886b3', '#fffdfd', '#271b0f'],
			['#fdd261', '#ffd589', '#9f401c', '#252b14', '#79431f'],
		],
		hexMap: false,
	},
	{
		id: 'q7',
		values: [
			['#b21e00', '#fabfa1', '#bec1e0', '#20186e', '#c1c1dd'],
			['#6cbe90', '#fac09a', '#f7f8fa', '#5889f0', '#181f39'],
			['#d9b020', '#fabea2', '#dab020', '#016701', '#d8b0ae'],
			['#1f177c', '#fac4a8', '#c4c2e7', '#ae2207', '#c6c2e5'],
			['#463fa9', '#f6c1a1', '#f6fafb', '#da6f83', '#019a65'],
		],
		hexMap: false,
	},
	{
		id: 'q8',
		values: [
			['#078bc5', '#fbd167', '#9d2522', '#327973', '#94341e'],
			['#e09324', '#ffdb91', '#f0b12d', '#197679', '#bda0b5'],
			['#f6ca0f', '#fac349', '#b4ad6c', '#6895b2', '#8b481e'],
			['#000543', '#9db8d8', '#deebf9', '#9db8d8', '#000543'],
			['#fff549', '#ffd77c', '#faa930', '#d85f28', '#ffffff'],
		],
		hexMap: false,
	},
	{
		id: 'q9',
		values: [
			['#f5e189', '#fad5bb', '#bace88', '#7e94a3', '#727b63'],
			['#6c89c4', '#ffe6c8', '#25225e', '#c50032', '#c6c2b3'],
			['#8c668e', '#e0cac6', '#2e2455', '#2e2455', '#b4acc7'],
			['#8fa0b5', '#c9b8b3', '#465a33', '#374677', '#36291b'],
			['#6b809b', '#d6bbab', '#5a612a', '#bbc2c4', '#573b32'],
		],
		hexMap: false,
	},
	{
		id: 'q10',
		values: [
			['#5b4d5e', '#f5c9a6', '#504a4c', '#3f363b', '#897d71'],
			['#fab7c0', '#f6d1b4', '#e7e7ef', '#df6f85', '#eef1e0'],
			['#9f6442', '#f0c4a9', '#b35150', '#d9d7c0', '#3c363a'],
			['#a87258', '#f3c8a6', '#bece61', '#dbac44', '#454452'],
			['#685e93', '#facaa4', '#414987', '#b48142', '#3e4a7e'],
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
