import { useState } from "react";

import styled from "@emotion/styled";
import { AnimatePresence, motion, useScroll } from "framer-motion";

import useHomePageViewModel from "@viewModels/useHomePageViewModel";

import movieService from "@services/movie.service";
import getImagePath from "@utils/imagePath";

import { Modal } from "@organisms";
const boxVariants = {
	hover: {
		y: -20,
		transition: { duration: 0.1 },
	},
};

export default function HomePage() {
	const [isVisible, setIsVisible] = useState(false);
	const [movieId, setMovieId] = useState<string>();
	const { scrollY } = useScroll();

	const { movies, movieDetail, isMovieDetailFetched } = useHomePageViewModel({
		service: movieService,
		movieId,
		enabledMovieDetailQuery: !!movieId && isVisible,
	});

	const isModalVisible = isVisible && isMovieDetailFetched;

	const onCloseMovieDetailModal = () => {
		setMovieId(undefined);
		setIsVisible(false);
	};

	const handleClickMovie = (movieId: string) => {
		setMovieId(movieId);
		setIsVisible(true);
	};

	const movieDetailImagePath = getImagePath(movieDetail?.poster_path);

	return (
		<Wrapper>
			<Movie.List>
				{movies?.results.map((movie) => (
					<Movie.ListItem
						key={movie.id}
						layoutId={`${movie.id}`}
						onClick={() => handleClickMovie(`${movie.id}`)}
						backgroundImage={getImagePath(movie.poster_path)}
						variants={boxVariants}
						initial="normal"
						whileHover="hover"
						transition={{ type: "tween" }}
					>
						<Movie.Text>{movie.title}</Movie.Text>
					</Movie.ListItem>
				))}
			</Movie.List>
			<AnimatePresence>
				<Modal isVisible={isModalVisible} onClose={onCloseMovieDetailModal}>
					{movieDetail && (
						<MovieModalContent.Wrapper
							layoutId={movieId}
							backgroundImage={movieDetailImagePath}
							style={{ top: scrollY.get() + 40 }}
						>
							<MovieModalContent.Container>
								<MovieModalContent.Text>{movieDetail.title}</MovieModalContent.Text>
							</MovieModalContent.Container>
						</MovieModalContent.Wrapper>
					)}
				</Modal>
			</AnimatePresence>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	margin: auto;
`;

const Text = styled.p`
	color: ${({ theme }) => theme.fontColors.white};
	text-align: center;
`;

const Movie = {
	List: styled.div`
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30px;
	`,
	ListItem: styled(motion.li)<{ backgroundImage: string }>`
		height: 600px;
		border-radius: 10px;
		background-image: url(${({ backgroundImage }) => backgroundImage});
		background-size: cover;
		background-repeat: no-repeat;

		display: flex;
		flex-direction: column;
		justify-content: end;

		cursor: pointer;
	`,
	Text: styled(Text)``,
	Image: styled.img`
		width: 100%;
	`,
};

const MovieModalContent = {
	Wrapper: styled(motion.div)<{ backgroundImage: string }>`
		height: 100%;
		padding: 0;
		object-fit: fill;
		background-image: url(${({ backgroundImage }) => backgroundImage});
		background-size: cover;
		background-repeat: no-repeat;

		display: flex;
		flex-direction: column;

		::-webkit-scrollbar {
			display: none;
		}
	`,
	Container: styled.div``,
	Text: styled.p``,
};
