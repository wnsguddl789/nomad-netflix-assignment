import { useQuery } from "@tanstack/react-query";
import { MovieService } from "@/services/movie.service";
import { QUERY_KEYS } from "@constants/queryKeys";

import { Movie } from "../types/movie.type";

type Props = {
	service: MovieService;
	movieId?: string;
	enabledMovieDetailQuery: boolean;
};

const useHomePageViewModel = ({ service, movieId, enabledMovieDetailQuery }: Props) => {
	const { data: movies } = useQuery<PagedMovies>({
		queryKey: [QUERY_KEYS.FETCH_MOVIES],
		queryFn: () => service.fetchMovies(),
	});

	const { data: movieDetail, isFetched: isMovieDetailFetched } = useQuery<Movie>({
		queryKey: [QUERY_KEYS.FETCH_MOVIE_DETAIL],
		queryFn: () => service.fetchMovieDetail(movieId),
		enabled: enabledMovieDetailQuery,
	});

	return { movies, movieDetail, isMovieDetailFetched };
};

type PagedMovies = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
};

export default useHomePageViewModel;
