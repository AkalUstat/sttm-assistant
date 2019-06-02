const anvaad = require('anvaad');
const hukam = require('./api_fetch')

async function convertTemplate (pulledShabad, newArray) {
  var result = await pulledShabad; 
  for(let i = 0; i < result.length - 1; i++){
    newArray.push(anvaad.translit(result[i]));
  }
  return newArray;
}
