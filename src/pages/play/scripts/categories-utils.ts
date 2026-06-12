export const categoriesUtils = {
	buildValues: (values: CategoryValuesRawType) => {
		// Create question values for categories
		return values.map((value) => {
			return {
				id: value.id,
				values: value.hexMap
					? categoriesUtils.setPixels(value.values, value.hexMap as CategoryNumbersMapType)
					: categoriesUtils.setPixels(value.values),
			};
		});
	},
	setPixels: (allColors: string[][], map?: CategoryNumbersMapType) => {
		// Function to get an array of hex colors
		let hexMap = [1, 2, 3, 4, 5];
		const hexColors = [];

		// Start loop for five sets of hex colors
		for (let i = 0; hexColors.length < 5; i++) {
			// Adjust map based on number of blocks
			if (i === 1) {
				hexMap = [1, 3, 4, 5];
			} else if (i === 2) {
				hexMap = [1, 3, 4];
			} else if (i === 3) {
				hexMap = [1, 3];
			} else if (i === 4) {
				hexMap = [1];
			}

			// Map and filter colors
			const currentColors = allColors.map((colors, index) => {
				// Set color map to check what colors should be included
				const numberOfPixels = 5 - i;
				const mapIndex = index + 1;
				const colorMap = map && map[mapIndex] && map[mapIndex][numberOfPixels] ? map[mapIndex][numberOfPixels] : hexMap;

				// Return valid colors
				return colors.filter((color, colorIndex) => {
					return colorMap.includes(colorIndex + 1);
				});
			});

			// Push colors
			hexColors.push(currentColors);
		}

		return hexColors;
	},
};
