var MongoClient = require('mongodb').MongoClient,
  utils = require('./utils');

const url = 'mongodb://localhost:27017/db',
  testedCount = 100000;

MongoClient.connect(url, function (err, db) {
  var collection = db.collection('test'),
    data = [], before = new Date();
  for (let id = 0; id < testedCount; id++) {
    data.push(getRowItem(id));
  }
  var oldDate = new Date();
  console.log('Время генерации тестовых данных: ' + getDiffTime(oldDate, before) + ' секунд');
  collection.insertMany(data, {}, function () {
    let newDate = new Date();
    console.log('Время вставки: ' + getDiffTime(newDate, oldDate) + ' секунд');
    db.close();
  });
});

function getDiffTime(newDate, oldDate) {
  let newTime = newDate.getTime(),
    oldTime = oldDate.getTime();
  return ((newTime - oldTime) / 1000).toFixed(3);
}

function getRowItem (id) {
  return {
    id: id,
    name: utils.getRandomString(20, 100),
    description: utils.getRandomString(100, 500),
    price: utils.getRandomFloat(0, 9999999999.99999999999999)
  };
}