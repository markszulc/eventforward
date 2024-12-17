const { Core } = require('@adobe/aio-sdk');
const { Amplify } = require('aws-amplify');
const { events } = require('aws-amplify/data');
const config = require('./amplify_outputs.json');
const WebSocket = require('ws');

// Polyfill WebSocket in Node.js environment
global.WebSocket = WebSocket;

Amplify.configure(config);

async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });
  
  
  //const eventtype = params.event;
  await events.post('/default/messages', {aemEvent: params});


  const response = {
    statusCode: 200,
    body: "<h1>Event forwarded successfully</h1>"
  }

  // log the response status code
  logger.info(`${response.statusCode}: successful request`)
  return response
}

exports.main = main