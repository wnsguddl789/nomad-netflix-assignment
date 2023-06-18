import { useEffect, useCallback } from "react";

const useEscKeyCloseEvent = (onClose: () => void) => {
	const onCloseEvent = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			onClose();
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		document.addEventListener("keydown", onCloseEvent);

		return () => document.removeEventListener("keydown", onCloseEvent);
	}, []);
};

export default useEscKeyCloseEvent;
