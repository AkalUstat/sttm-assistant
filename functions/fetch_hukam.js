const getJSON = require('get-json');

// const hasSatgurPrasaad = true; 
// function fetchMangal(){
//   return new Promise(resolve => {
//     getJSON('https://api.banidb.com/v2/hukamnamas/today', (error, response) => {
//       if (!error) {
//         const sID = respabads[0].shabadInfo.shabadId;
//         const raagAndWriter = response.shabads[0].verses[0].larivaar.gurmukhi; 
//         let remainingMangal = '';
//         if(response.shabads[0].verses[1].verse.gurmukhi === '<> siqgur pRswid ]'){
//           remainingMangal = '<> siqgur pRswid ]';
//         }
//         resolve(raagAndWriter + remainingMangal);
//       }
//    }
//   )}
// )}
let retrievedShabad = [];
function fetchShabad(){
  return new Promise(resolve => {
    getJSON('https://api.banidb.com/v2/hukamnamas/today', (error, response) => {
      if(!error) {
       for (let looper =0; looper < response.shabads[0].verses.length - 1; looper++) {
         retrievedShabad[looper] = response.shabads[0].verses[looper].verse.gurmukhi;
       }
       resolve(retrievedShabad);
      }
    })
  })
}