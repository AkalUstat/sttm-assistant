const anvaad = require('anvaad-js');
const hukam = require('./api_fetch')

async function convertTemplate (pullShabadFunc) {
  var result = await pullShabadFunc;
  var newArray = []
  for(let i = 0; i < result.length - 1; i++){
    newArray.push(anvaad.translit(result[i]));
  }
  return newArray;
  
}

exports.convertTemplate = convertTemplate;