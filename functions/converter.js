const anvaad = require('anvaad');
const hukam = require('./fetch_hukam')


let convertedVerse = [];
async function converter() {
  var result = await hukam.fetchShabad();
  for (let i =0; i < result.length; i++){
    convertedVerse.push(anvaad.translit(result[i]));
  }
}