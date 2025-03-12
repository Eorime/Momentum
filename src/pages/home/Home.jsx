import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import apiService from "../../services/api";
import Header from "../../components/common/header/Header";

const Home = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await apiService.getTasks();
				setTasks(response.data);
				console.log(response.data);
			} catch (error) {
				console.log("couldnt fetch ;(");
			}
		};

		fetchTasks();
	}, []);
	return (
		<Container>
			<Header />
		</Container>
	);
};

export default Home;
