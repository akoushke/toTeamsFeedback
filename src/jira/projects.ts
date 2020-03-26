import axios from './axios';

export default class Projects {
	constructor() { }

	async getProjects() {
		try {
			const { data } = await axios.get(`/project`);

			return data;
		}
		catch (error) {
			console.error(error.message)
		}
	}

	async getProject(projectKey: string) {
		try {
			const { data } = await axios.get(`/project/${projectKey}`);

			return data;
		}
		catch (error) {
			console.error(error.message)
		}
	}

	async getProjectComponents(projectKey: string) {
		try {
			const { data } = await axios.get(`/project/${projectKey}/components`);

			return data;
		}
		catch (error) {
			console.error(error.message)
		}
	}
}