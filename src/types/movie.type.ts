type Movie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

type MovieDetail = {
	belongs_to_collection: BelongsToCollection;
	budget: number;
	homepage: string;
	genres: Genre[];
	imdb_id: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
} & Movie;

type BelongsToCollection = {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
};

type Genre = {
	id: number;
	name: string;
};

type ProductionCompany = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};

type ProductionCountry = {
	iso_3166_1: string;
	name: string;
};

type SpokenLanguage = {
	english_name: string;
	iso_639_1: string;
	name: string;
};

type APIResponse = {
	page: number;
	results: Movie[];
};

export type {
	Movie,
	MovieDetail,
	BelongsToCollection,
	Genre,
	ProductionCompany,
	ProductionCountry,
	SpokenLanguage,
	APIResponse,
};
