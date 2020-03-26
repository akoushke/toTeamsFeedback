import { BOT_NAME } from '../constants';
import axios from './axios';

export default class Messages {

	async getMessage(messageID: string) {
		let message = { text: '', html: '' };

		try {
			const { data: { text, html } } = await axios.get(`/messages/${messageID}`);

			message = { text: text.replace(BOT_NAME, '').trim(), html }
		}
		catch (error) {
			console.error(error)
		}

		return message;
	}

	async sendMessage(roomId: string, markdown: string, parentId?: string) {
		try {
			await axios.post('/messages', { roomId, markdown, parentId });

		}
		catch (error) {
			console.error(error)
		}
	}
}