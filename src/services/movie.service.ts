import ApiClient from "@utils/apiClient";

export class MovieService extends ApiClient {
	public async fetchMovies<T>(): Promise<T> {
		const { data } = await this.get<T>("/popular");

		return data;
	}

	public async fetchNowPlayingMovies<T>(): Promise<T> {
		const { data } = await this.get<T>("/now-playing");

		return data;
	}

	public async fetchComingSoonMovies<T>(): Promise<T> {
		const { data } = await this.get<T>("/coming-soon");

		return data;
	}

	public async fetchMovieDetail<T>(id?: string): Promise<T> {
		const { data } = await this.get<T>(`/movie?id=${id}`);

		return data;
	}
}

export default new MovieService();
