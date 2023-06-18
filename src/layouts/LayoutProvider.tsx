import { createContext } from "react";

import { Link, useMatch, useLocation, Location } from "react-router-dom";
import styled from "@emotion/styled";

import { PATH_KEYS } from "@constants/pathKeys";

const THEME = {
	MODE: ["LIGHT", "DARK"],
} as const;

type THEME_MODE_TYPE = (typeof THEME.MODE)[number];

type LayoutProviderProps = {
	children: React.ReactNode;
};

type LayoutContextType = {
	mode: THEME_MODE_TYPE;
};

const LayoutContext = createContext<LayoutContextType>({
	mode: (localStorage.getItem("themeMode") as THEME_MODE_TYPE) || "LIGHT",
});

const LayoutProvider = ({ children }: LayoutProviderProps) => {
	const location = useLocation();

	const paths = [
		{ pathname: PATH_KEYS.HOME, text: "Home" },
		{ pathname: PATH_KEYS.COMING_SOON, text: "Coming Soon" },
		{ pathname: PATH_KEYS.NOW_PLAYING, text: "Now Playing" },
	];

	return (
		<LayoutContext.Provider value={{ mode: "LIGHT" }}>
			<Layout.Wrapper>
				<Layout.Header>
					<p className="header__title">Netflix</p>
					<ul className="header__navigation-list">
						{paths.map(({ pathname, text }) => (
							<li>
								<Layout.StyledLink
									to={pathname}
									key={pathname}
									isCurrentPath={location.pathname === pathname}
								>
									{text}
								</Layout.StyledLink>
							</li>
						))}
					</ul>
				</Layout.Header>
				<Layout.Main>{children}</Layout.Main>
			</Layout.Wrapper>
		</LayoutContext.Provider>
	);
};

export default LayoutProvider;

const Layout = {
	Wrapper: styled.div`
		width: 80%;
		margin: auto;
		background-color: #010101;
	`,
	Header: styled.header`
		height: 10vh;

		display: flex;
		align-items: center;
		gap: 16px;

		.header__title {
			color: tomato;
			font-size: 32px;
		}

		.header__navigation-list {
			display: flex;
			gap: 8px;
		}
	`,
	StyledLink: styled(Link)<{ isCurrentPath: boolean }>`
		text-decoration: none;
		font-size: 24px;
		color: ${({ isCurrentPath }) => (isCurrentPath ? "tomato" : "white")};

		&:hover {
			color: tomato;
		}
	`,
	Main: styled.main`
		margin-bottom: 5vh;
	`,
};
