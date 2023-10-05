// Generate random array index between 0 (inclusive) and max (inclusive) value
export const getRandomIntBetweenZeroAndVal = (maxVal: number): number => {
	const max: number = Math.floor(maxVal);
	return Math.floor(Math.random() * (max + 1));
};

export const getRandomBool = (): boolean => {
	const coinFlip = getRandomIntBetweenZeroAndVal(1);
	return coinFlip == 1;
}

export const getRandomIntInclusive = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// get a percentage between 1 and 100 (inclusive)
export const getPercentageDisplayValue = (num: number): number => {
	if (num < 1) {
		return 1;
	} else if (num > 100) {
		return 100;
	} else {
		return num;
	}
}
