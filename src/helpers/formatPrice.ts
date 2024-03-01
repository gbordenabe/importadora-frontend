export const formatPrice = (value: number = 0) => {
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};
