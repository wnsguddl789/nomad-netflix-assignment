const getImagePath = (imagePath?: string) => {
	return `https://image.tmdb.org/t/p/w500${imagePath}`;
};

export default getImagePath;
