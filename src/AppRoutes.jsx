import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./config/routes";

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				{appRoutes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.Component />}
					/>
				))}
			</Routes>
		</Router>
	);
};

export default AppRoutes;
