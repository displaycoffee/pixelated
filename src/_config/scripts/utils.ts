export const utils = {
	getLast: (value: string | [], delimeter?: string) => {
		// Get last item in array
		let valueArray = [] as string[] | number[];
		if (Array.isArray(value)) {
			valueArray = value;
		} else if (delimeter) {
			valueArray = value.split(delimeter);
		}
		return valueArray[valueArray.length - 1];
	},
	pixels: (allColors: string[][], map?: ObjectNumbersType) => {
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
				const mapKey = `${index}-${5 - i}`;
				const colorMap = map && map[mapKey] ? map[mapKey] : hexMap;

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
	scrollTo: (e: EventsType, selector: string | undefined, offset: number) => {
		// Scroll to element on page
		if (e) {
			e.preventDefault();
		}
		const anchor = {
			selector: selector,
			offset: offset ? offset : 0,
			position: () => {
				const anchorElement = anchor.selector && document.querySelector(anchor.selector) ? document.querySelector(anchor.selector) : false;
				return anchorElement ? anchorElement.getBoundingClientRect().top + window.scrollY - anchor.offset : 0 - anchor.offset;
			},
		};
		window.scroll({ top: anchor.position(), left: 0, behavior: 'smooth' });
	},
};
