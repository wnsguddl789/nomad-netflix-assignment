import { Outlet } from "react-router-dom";

import LayoutProvider from "./layouts/LayoutProvider";

const App = () => {
	return (
		<LayoutProvider>
			<Outlet />
		</LayoutProvider>
	);
};

export default App;
