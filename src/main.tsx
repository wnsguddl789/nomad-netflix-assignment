import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./utils/queryClient";

import App from "./App";
import "./styles/reset.css";

import { HomePage, ComingSoonPage, NowPlayingPage } from "@pages";
import { PATH_KEYS } from "@constants/pathKeys";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: PATH_KEYS.HOME, element: <HomePage /> },
			{ path: PATH_KEYS.COMING_SOON, element: <ComingSoonPage /> },
			{ path: PATH_KEYS.NOW_PLAYING, element: <NowPlayingPage /> },
		],
	},
]);

export const theme = {
	fontColors: {
		white: "#F1F1F1",
		black: "#010101",
	},
};

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	</React.StrictMode>
);
