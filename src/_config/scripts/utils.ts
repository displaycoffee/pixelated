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
	pixels: (allColors: string[][], blocks: number, map?: ObjectNumbersType) => {
		// Function to get an array of hex colors
		let hexMap: number[] = [0, 2, 3, 4];

		// Adjust map based on number of blocks
		if (blocks === 3) {
			hexMap = [0, 2, 3];
		} else if (blocks === 2) {
			hexMap = [0, 2];
		} else if (blocks === 1) {
			hexMap = [0];
		}

		// Map and filter colors
		const hexColors: string[][] = allColors.map((colors, index) => {
			// Set color map to check what colors should be included
			const colorMap = map && map[index] ? map[index] : hexMap;

			// Return valid colors
			return colors.filter((color, colorIndex) => {
				return colorMap.includes(colorIndex);
			});
		});

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
