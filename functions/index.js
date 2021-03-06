'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {
  dialogflow,
  BasicCard,
  SimpleResponse,
  Suggestions,
} = require('actions-on-google');
const converter = require('./converter');
const api = require('./api_fetch')
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const app = dialogflow();

const cards = {
  'BaniDB': {
    title: "Today's Hukamnama",
    text: 'Brought to you by BaniDB!',
    image: {
      url: 'http://www.banidb.com/wp-content/uploads/2018/03/full-banidb-logo.png',
      accessibilityText: 'BaniDB logo',
    },
    display: 'WHITE',
  },
  'Error': {
    title: "Error 1313",
    text: 'Unfortunately, something went wrong ):',
    image: {
      src: './assets/404.png',
      accessibilityText: 'Sikh guy smiling at you',
    },
    display: 'WHITE',
  }, 
  'Khalis': {
    title: "KhalisFoundation", 
    text: 'The the website or the github', 
    image: {
      url: 'https://khalisfoundation.org/wp-content/uploads/2016/11/khalis-logo-inv-hq.png',
      accessibilityText: 'KhalisFoundation Logo', 
    }, 
    display: "WHITE", 
  }
};

app.intent("Default Welcome Intent", (conv) => {
  conv.ask(`Welcome to Gurbaani Voice!`);
});

app.intent("Default Fallback Intent", (conv) => {
  conv.ask(`I didn't understand`)
  conv.ask(`I'm sorry, can you try again?`);
});

app.intent("HukamFetch", (conv) => {
  
  return converter.unicodeGurmukhi(api.fetchHukam()).then((result) => {

    // conv.ask(result.join('\n'));
    conv.ask(new SimpleResponse({
      speech: '',
      text: result.join('\n'),
    }));
    if(!conv.screen) {
      conv.ask(cards['BaniDB'].text);
    }else {
      conv.ask(new BasicCard(cards['BaniDB']));
    }
    return;
  }).catch((error) => {
    console.error("errorMessage:", error);
    conv.ask("Sorry we couldn't get Hukamnama for you ): ");
    conv.ask(new BasicCard(cards['Error']));
    return;
  });
});

app.intent("Creator", (conv) => {
  conv.ask('I am created by Khalis Foundation');
  conv.ask(new BasicCard(cards['Khalis']));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);