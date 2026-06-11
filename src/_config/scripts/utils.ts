export const utils: UtilsType = {
	getLast: (value: string | string[], delimeter?: string) => {
		// Get last item in array
		let valueArray = [] as string[] | number[];
		if (Array.isArray(value)) {
			valueArray = value;
		} else if (delimeter) {
			valueArray = value.split(delimeter);
		}
		return valueArray[valueArray.length - 1] ?? '';
	},
	scrollTo: (e?: EventsType, selector?: string, offset?: number) => {
		// Scroll to element on page
		if (e) {
			e.preventDefault();
		}
		const anchor = {
			selector: selector ?? '',
			offset: offset ?? 0,
			position: () => {
				const anchorElement = anchor.selector ? document.querySelector(anchor.selector) : false;
				return anchorElement ? anchorElement.getBoundingClientRect().top + window.scrollY - anchor.offset : -anchor.offset;
			},
		};
		window.scroll({ top: anchor.position(), left: 0, behavior: 'smooth' });
	},
};
