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

const app = dialogflow();

app.intent("Default Welcome Intent", (conv) => {
  conv.ask(`Welcome to the Gurbaani Voice!`);
});

app.intent("Default Fallback Intent", (conv) => {
  conv.ask(`I didn't understand`)
  conv.ask(`I'm sorry, can you try again?`);
});

app.intent("HukamFetch", (conv) => {
  // var card = new Card({
  //   title: `Today's Hukamnama`,
  //   text: `Brought to you by BaniDB`,
  //   buttons: new Button({
  //     title: 'Take a look on github!',
  //     url: 'https://github.com/AkalUstat/sttm-assistant',
  //   }),
  //   image: new Image({
  //     url: 'http://www.banidb.com/wp-content/uploads/2018/03/full-banidb-logo.png',
  //     alt: 'Brought to you by BaniDB',
  //   })
  // });

  return converter.convertTemplate(api.fetchHukam()).then((result) => {

    conv.ask(result.join('\n'));
    
    //conv.ask(card);
    // conv.ask(new Suggestion(`Quick Reply`));
    // conv.ask(new Suggestion(`Suggestion`));

    return;
  }).catch((error) => {
    console.error("errorMessage:", error);
    conv.ask("Sorry we couldn't get Hukamnama for you");
    return;
  });
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);


// exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
//   const agent = new WebhookClient({ request, response });
//   console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
//   console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
//   function welcome(agent) {
//     agent.add(`Welcome to the Gurbaani Voice!`);
//   }
 
//   function fallback(agent) {
//     agent.add(`I didn't understand`);
//     agent.add(`I'm sorry, can you try again?`);
//   }

//   // Uncomment and edit to make your own intent handler
//   // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
//   // below to get this function to be run when a Dialogflow intent is matched
//   function hukamHandler(agent) {
//     converter.convertTemplate(api.fetchHukam()).then(result => {
//       agent.add(result);
//       agent.add(new Card({
//           title: `Today's Hukamnama`,
//           imageUrl: 'http://www.banidb.com/wp-content/uploads/2018/03/full-banidb-logo.png',
//           text: `Brought to you by BaniDB`,
//           buttonText: 'Take a look on github!',
//           buttonUrl: 'https://github.com/AkalUstat/sttm-assistant'
//         })
//       );
//       agent.add(new Suggestion(`Quick Reply`));
//       agent.add(new Suggestion(`Suggestion`));

//       return;
//     }).catch((error) => {
//       console.error("errorMessage:", error);
//       agent.add("Sorry we couldn't get Hukamnama for you");
//       return;
//     });
    
//   }

//   // Uncomment and edit to make your own Google Assistant intent handler
//   // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
//   // below to get this function to be run when a Dialogflow intent is matched
//   function googleAssistantHandler(agent) {
//     let conv = agent.conv(); // Get Actions on Google library conv instance
//     conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
//     agent.add(conv); // Add Actions on Google library responses to your agent's response
//   }
//   // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
//   // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

//   // Run the proper function handler based on the matched Dialogflow intent name
//   let intentMap = new Map();
//   intentMap.set('Default Welcome Intent', welcome);
//   intentMap.set('Default Fallback Intent', fallback);
//   intentMap.set('HukamFetch', hukamHandler);
//   // intentMap.set('HukamFetch', googleAssistantHandler);
//   agent.handleRequest(intentMap);
// });
