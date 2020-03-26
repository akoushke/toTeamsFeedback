import express from 'express';
import bodyParser from 'body-parser';
import Messages from './teams/messages';
import Projects from './jira/projects';
import { PORT, BOT_ID } from './constants';
import Issues from './jira/issues';

import Bot from './bot';

const app = express();
const messages = new Messages();
const projects = new Projects();
const issues = new Issues();
const bot = new Bot();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (request: any, response: any) => {
	response.send('Hello from Hoff!')
});

app.post('/listen', async (request: any, response: any) => {
	const { id, personId, roomId } = request.body.data;

	if (personId !== BOT_ID) await bot.calculate(id, personId, roomId);
});

app.get('/jira/projects', async (request: any, response: any) => {
	response.send(await projects.getProjects());
});

app.get('/jira/projects/:id/components', async (request: any, response: any) => {
	response.send(await projects.getProjectComponents(request.params['id']));
});

app.get('/jira/projects/:id', async (request: any, response: any) => {
	response.send(await projects.getProject(request.params['id']));
});

app.get('/jira/projects', async (request: any, response: any) => {
	response.send(await projects.getProjects());
});

app.get('/jira/issues/:id', async (request: any, response: any) => {
	response.send(await issues.getIssue(request.params['id']));
});

app.post('/jira/issues', async (request: any, response: any) => {
	// response.send(await issues.createIssue());
});

app.listen(PORT, function () {
	console.info(`port ${PORT} is running!`);
});

const WEBHOOK_DETAILS = {
	"id": "Y2lzY29zcGFyazovL3VzL1dFQkhPT0svNmNkMmJkY2MtNjc0Zi00MzQ1LTg1MWItNTU2N2IyN2VhMTMz",
	"name": "ToTeamsFeedback",
	"targetUrl": "https://teamsfeedback.ngrok.io/listen",
	"resource": "messages",
	"event": "created",
	"orgId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8xZWI2NWZkZi05NjQzLTQxN2YtOTk3NC1hZDcyY2FlMGUxMGY",
	"createdBy": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS8zNzUzZWIwYS1jMTU4LTRkMDUtYTRhNy05NWQ0NjZiZjBiNDE",
	"appId": "Y2lzY29zcGFyazovL3VzL0FQUExJQ0FUSU9OL0MzMmM4MDc3NDBjNmU3ZGYxMWRhZjE2ZjIyOGRmNjI4YmJjYTQ5YmE1MmZlY2JiMmM3ZDUxNWNiNGEwY2M5MWFh",
	"ownedBy": "creator",
	"status": "active",
	"created": "2020-03-22T04:06:50.271Z"
};