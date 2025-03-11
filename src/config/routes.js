import { Component } from "react";
import { routes } from "../constants/routes";
import Home from "../pages/home/Home";
import TaskDetails from "../pages/taskDetails/TaskDetails";
import CreateTask from "../pages/createTask/CreateTask";

export const appRoutes = [
	{
		path: routes.home,
		Component: Home,
	},
	{
		path: routes.taskDetails,
		Component: TaskDetails,
	},
	{
		path: routes.createTask,
		Component: CreateTask,
	},
];
