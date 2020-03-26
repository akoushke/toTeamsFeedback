import Webex from 'webex';
import {BOT_TOKEN} from '../constants';

class SDK {
	instance: any;

	constructor(token: string) {
		this.instance = new Webex({
			credentials: token
		});
	}

	async register() {
		try {
			await this.instance.internal.device.register();
			await this.instance.internal.mercury.connect();

			return 'SDK has been registered properly!';
		} catch(error) {
			console.error(error.message);
		}
	}
}

export default new SDK(BOT_TOKEN);
