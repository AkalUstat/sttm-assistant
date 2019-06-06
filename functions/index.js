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
    conv.ask(new MediaObject({
      name: 'Hukamnama',
      url: 'http://old.sgpc.net/hukumnama/jpeg%20hukamnama/hukamnama.mp3',
      description: 'Hukamnama audio from SGPC website',
      icon: new Image({
        url: 'https://www.google.com/search?safe=active&tbm=isch&source=hp&biw=1440&bih=839&ei=MV74XIr4LI26_wS2toaQCw&q=darbar+sahib+128x128&oq=darbar+sahib+128x128&gs_l=img.3...1721.6578..6832...1.0..0.86.1533.22......0....1..gws-wiz-img.....0..35i39j0j0i8i30j0i24.dxTH9dt9yto#imgrc=Pm752VEh7dt6TM:',
      }),
    })+ new BasicCard({
      title: '',
      text: result.join('  \n'),
      buttons: new Button({
        title: 'See my source!',
        url: 'https://www.sikhitothemax.org/hukamnama',
      }),

    }));
    if(!conv.screen) {
      conv.ask(cards['BaniDB'].text);
      conv.ask(new Suggestions(['Who created you?', 'Random Shabad']));
    }else {
      conv.ask(new BasicCard(cards['BaniDB']));
    }
    return;
  }).catch((error) => {
    console.error("errorMessage:", error);
    conv.ask(new BasicCard(cards['Error']));
    return;
  });
});

app.intent("Creator", (conv) => {
  conv.ask('I am created by Khalis Foundation');
  conv.ask(new BasicCard(cards['Khalis']));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);