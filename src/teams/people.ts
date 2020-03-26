import { BOT_NAME } from '../constants';
import axios from './axios';

export default class People {

	async getPerson(personID: string) {
		let person = { displayName: '' };

		try {
			const { data: { displayName } } = await axios.get(`/people/${personID}`);

			person = { displayName }
		}
		catch (error) {
			console.error(error)
		}

		return person;
	}
}