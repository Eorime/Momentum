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
			localStorage.getItem("token") || "9e71e1f6-b8cb-4a84-9cfb-fd16188db038";

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
	getCommentsByTaskId: async (taskId) => {
		try {
			const response = await api.get(`/tasks/${taskId}/comments`);
			return response;
		} catch (error) {
			throw error;
		}
	},

	addComment: async (taskId, text, parentId = null) => {
		try {
			const response = await api.post(`/tasks/${taskId}/comments`, {
				text: text,
				parent_id: parentId,
			});
			return response;
		} catch (error) {
			throw error;
		}
	},

	//tasks
	getTasks: () => api.get("/tasks"),
	getTaskById: (id) => api.get(`/tasks/${id}`),
	createTask: (data) => api.post("/tasks", data),
	changeTaskStatus: (id, status) => api.put(`/tasks/${id}`, status),
};

export default apiService;
