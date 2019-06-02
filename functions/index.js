const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {
  dialogflow,
  Permission,
  Suggestions,
} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const converter = require('./converter');
const api = require('./api_fetch')
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // Uncomment and edit to make your own intent handler
  // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // below to get this function to be run when a Dialogflow intent is matched
  function hukamHandler(agent) {
    let convertedHukam = [];
    agent.add(convertTemplate(api.fetchHukam, convertedHukam));
    agent.add(new Card({
        title: `Today's Hukamnama`,
        imageUrl: 'http://www.banidb.com/wp-content/uploads/2018/03/full-banidb-logo.png',
        text: `Brought to you by BaniDB`,
        buttonText: 'Take a look on github!',
        buttonUrl: 'https://github.com/AkalUstat/sttm-assistant'
      })
    );
    agent.add(new Suggestion(`Quick Reply`));
    agent.add(new Suggestion(`Suggestion`));
  }

  // Uncomment and edit to make your own Google Assistant intent handler
  // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // below to get this function to be run when a Dialogflow intent is matched
  function googleAssistantHandler(agent) {
    let conv = agent.conv(); // Get Actions on Google library conv instance
    conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    agent.add(conv); // Add Actions on Google library responses to your agent's response
  }
  // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('HukamFetch', hukamHandler);
  // intentMap.set('HukamFetch', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
