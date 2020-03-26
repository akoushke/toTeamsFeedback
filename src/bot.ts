import htmlToText from 'html-to-text';
import Issues from './jira/issues';
import Messages from './teams/messages';
import People from './teams/people';

export default class Bot {
	issues: Issues;
	messages: Messages;
	people: People;

	constructor() {
		this.issues = new Issues();
		this.messages = new Messages();
		this.people = new People();
	}

	async calculate(messageID: string, personId: string, roomId: string): Promise<any> {
		const { text, html } = await this.messages.getMessage(messageID);
		const action = 'create';

		switch (action) {
			case 'create':
				const summary = htmlToText.fromString(html).split('\n')[1];
				const { url } = await this.issues.createIssue(summary, summary);
				const { displayName } = await this.people.getPerson(personId);
				const message = `Dear ${displayName}, [JIRA](${url}) had been created!`;

				await this.messages.sendMessage(roomId, message, messageID);
		}
	}
}