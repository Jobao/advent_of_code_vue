export const isNumber = (v: string): boolean => {
	return !Number.isNaN(Number.parseInt(v));
};
