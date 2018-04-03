var MongoClient = require('mongodb').MongoClient,
  utils = require('./utils');

const url = 'mongodb://localhost:27017/db';

MongoClient.connect(url, (err, db) => {
  var collection = db.collection('test'),
    oldDate = new Date(),
    newName = utils.getRandomString(20, 100);
  collection.updateMany({}, {$set: {name : newName}}, {}, () => {
    let newDate = new Date();
    console.log('Время обновления: ' + getDiffTime(newDate, oldDate) + ' секунд');
    db.close();
  });
});

function getDiffTime(newDate, oldDate) {
  let newTime = newDate.getTime(),
    oldTime = oldDate.getTime();
  return ((newTime - oldTime) / 1000).toFixed(3);
}