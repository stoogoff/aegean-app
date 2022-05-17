
export const id = (input) =>
	input.trim().normalize("NFD").replace(/[^a-z0-9\-\s]/gi, '').replace(/\s{1,}/g, "-").toLowerCase()
