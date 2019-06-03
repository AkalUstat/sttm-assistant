const getJSON = require('get-json');

async function fetchHukam(){
  let retrievedShabad = [];
  var baniResponse = await getJSON('https://api.banidb.com/v2/hukamnamas/today');

  for (let looper = 0; looper < baniResponse.shabads[0].verses.length - 1; looper++) {
    retrievedShabad[looper] = baniResponse.shabads[0].verses[looper].verse.gurmukhi;
  }
  return retrievedShabad;
}

exports.fetchHukam = fetchHukam;