import axios from './axios';
import { JIRA_API_URL, JIRA_BROWSE_URL } from '../constants';

export default class Issues {
	constructor() { }

	async getIssue(id: string) {
		try {
			const { data } = await axios.get(`/issue/${id}`);

			return data;
		}
		catch (error) {
			console.error(error.message)
		}
	}

	async createIssue(description: string, summary: string) {
		const response = { url: JIRA_BROWSE_URL };

		try {
			const params = {
				expand: "renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations",
				fields: {
					project: {
						key: "SPARK"
					},
					summary,
					assignee: {
						name: 'akoushke'
					},
					issuetype: {
						id: "3",
					},
					priority: {
						id: "8"
					},
					description,
					components: [],
				}
			};
			const { data: { self, key, id } } = await axios.post('/issue', params);
			response.url = `${JIRA_BROWSE_URL}/${key}`;
		}
		catch (error) {
			console.error(`Unable to create JIRA issues:\n${error.message}`);

			if (error.response) {
				console.error(`more info:\n`, error.response.data.errors);
			}
		}

		return response;
	}
}