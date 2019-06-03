const anvaad = require('anvaad-js');
const hukam = require('./api_fetch')

async function engTranslit (pullShabadFunc) {
  var result = await pullShabadFunc;
  var newArray = []
  for(let i = 0; i < result.length - 1; i++){
    newArray.push(anvaad.translit(result[i]));
  }
  return newArray;
  
}

async function uniPunjabi (pullShabadFunc) {
  var result = await pullShabadFunc;
  var newArray = []
  for(let i = 0; i < result.length - 1; i++){
    newArray.push(anvaad.unicode(result[i]));
  }
  return newArray;
}
async function ipaTranslit (pullShabadFunc) {
  var result = await pullShabadFunc;
  var newArray = []
  for(let i = 0; i < result.length - 1; i++){
    newArray.push(anvaad.translit(result[i], 'ipa'));
  }
  return newArray;
  
}
// exports.engTranslit = engTranslit;
module.exports = {
  engTranslit, 
  uniPunjabi,
  ipaTranslit
};