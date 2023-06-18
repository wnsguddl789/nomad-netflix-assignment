import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			if (query?.meta?.onError && typeof query?.meta?.onError === "function") {
				query?.meta?.onError();
			}
		},
		onSuccess(data, query) {
			if (query?.meta?.onSuccess && typeof query?.meta?.onSuccess === "function") {
				query?.meta?.onSuccess();
			}
		},
	}),
});

export default queryClient;
