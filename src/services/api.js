import axios from "axios";

const api = axios.create({
	baseURL: "https://momentum.redberryinternship.ge/api",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token =
			localStorage.getItem("token") || "9e685e02-64d7-4ca9-8294-ef39afed22da";

		config.headers.Authorization = `Bearer ${token}`;

		return config;
	},
	(error) => Promise.reject(error)
);

export const apiService = {
	//statuses
	getStatuses: () => api.get("/statuses"),

	//priorities
	getPriorities: () => api.get("/priorities"),

	//departments
	getDepartments: () => api.get("/departments"),

	//employees
	getEmployees: () => api.get("/employees"),
	createEmployee: (employeeData) => {
		return api.post("/employees", employeeData, {
			headers: {
				"Content-Type": undefined,
			},
		});
	},

	//comments
	getComments: (id) => api.get(`/tasks/${id}/comments`),
	createComment: (id, commentData) => api.post(`/tasks/${id}/comments`),

	//tasks
	getTasks: () => api.get("/tasks"),
	getTaskById: (id) => api.get(`/tasks/${id}`),
	createTask: (data) => api.post("/tasks", data),
	changeTaskStatus: (id, status) => api.put(`/tasks/${id}`, status),
};

export default apiService;
