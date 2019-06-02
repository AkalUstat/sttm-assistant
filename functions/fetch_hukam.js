const getJSON = require('get-json');

const hasSatgurPrasaad = true; 
function fetchMangal(){
  return new Promise(resolve => {
    getJSON('https://api.banidb.com/v2/hukamnamas/today', (error, response) => {
      if (!error) {
        const sID = response.shabads[0].shabadInfo.shabadId;
        const raagAndWriter = response.shabads[0].verses[0].larivaar.gurmukhi; 
        let remainingMangal = ' ';
        if(response.shabads[0].verses[1].verse.gurmukhi === '<> siqgur pRswid ]'){
          remainingMangal = '<> siqgur pRswid ]';
        }
        resolve(raagAndWriter + remainingMangal);
      }
   }
  )}
)}