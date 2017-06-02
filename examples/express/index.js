require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');

const { MessengerBot } = require('../../src');
const { verifyMessengerWebhook } = require('../../src/express');

const config = {
  verifyToken: '1qaz2wsx',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.handle(context => {
  context.sendText('Hello World');
});

const server = express();

server.use(bodyParser.json());
server.get(
  '/',
  verifyMessengerWebhook({
    verifyToken: config.verifyToken,
  })
);
server.post('/', bot.createExpressMiddleware());

server.listen(5000, () => {
  console.log('server is running...');
});
