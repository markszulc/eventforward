const { Core } = require('@adobe/aio-sdk');
const { Amplify } = require('aws-amplify');
const { events } = require('aws-amplify/data');
const WebSocket = require('ws');

// Polyfill WebSocket in Node.js environment
global.WebSocket = WebSocket;

async function main (params) {

  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });

  //log params
  //logger.info(`params: ${JSON.stringify(params)}`)

  // connect to the Amplify API
  Amplify.configure({
    "API": {
      "Events": {
        "endpoint": params.AWS_ENDPOINT,
        "region": params.AWS_REGION,
        "defaultAuthMode": params.AWS_DEFAULT_AUTH_MODE,
        "apiKey": params.AWS_APIKEY
      }
    }
  });
  
  //const eventtype = params.event;
  await events.post('/default/messages', {aemEvent: params.data, aemEventType: params.type});

  const response = {
    statusCode: 200,
    body: "<h1>Event forwarded successfully</h1>"
  }

  // log the response status code
  logger.info(`${response.statusCode}: successful request`)
  return response
}

exports.main = main