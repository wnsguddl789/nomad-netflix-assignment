import "@emotion/react";
import { theme } from "@/main";

type ThemeType = typeof theme;

declare module "@emotion/react" {
	export interface Theme extends ThemeType {}
}
