export const categoriesUtils = {
	setPixels: (allColors: string[][], map?: CategoryNumbersMapType) => {
		// Function to get an array of hex colors
		let hexMap = [0, 1, 2, 3, 4];
		const hexColors = [];

		// Start loop for five sets of hex colors
		for (let i = 0; hexColors.length < 5; i++) {
			// Adjust map based on number of blocks
			if (i === 1) {
				hexMap = [0, 2, 3, 4];
			} else if (i === 2) {
				hexMap = [0, 2, 3];
			} else if (i === 3) {
				hexMap = [0, 2];
			} else if (i === 4) {
				hexMap = [0];
			}

			// Map and filter colors
			const currentColors = allColors.map((colors, index) => {
				// Set color map to check what colors should be included
				const numberOfPixels = 5 - i;
				const colorMap = map && map[index] && map[index][numberOfPixels] ? map[index][numberOfPixels] : hexMap;

				// Return valid colors
				return colors.filter((color, colorIndex) => {
					return colorMap.includes(colorIndex);
				});
			});

			// Push colors
			hexColors.push(currentColors);
		}

		return hexColors;
	},
};
