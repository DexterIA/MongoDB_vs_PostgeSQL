var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/db';

MongoClient.connect(url, (err, db) => {
  let collection = db.collection('test'),
    oldDate = new Date();
  collection.find({}).toArray(() => {
    let newDate = new Date();
    console.log('Время чтения: ' + getDiffTime(newDate, oldDate) + ' секунд');
    db.close();
  });
});

function getDiffTime(newDate, oldDate) {
  let newTime = newDate.getTime(),
    oldTime = oldDate.getTime();
  return ((newTime - oldTime) / 1000).toFixed(3);
}