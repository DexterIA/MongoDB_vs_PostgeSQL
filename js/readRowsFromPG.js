var Client = require('pg').Client,
  client = new Client({
    user: 'postgres',
    database: 'test',
    password: 'admin'
  });

const SQL_String = "SELECT * FROM test1";

client.connect(function () {
  var oldDate = new Date();
  client.query(SQL_String, function (err, result) {
    let newDate = new Date();
    console.log('Количество записей: ' + result.rows.length);
    console.log('Время чтения: ' + getDiffTime(newDate, oldDate) + ' секунд');
    client.end()
  });
});

function getDiffTime(newDate, oldDate) {
  let newTime = newDate.getTime(),
    oldTime = oldDate.getTime();
  return ((newTime - oldTime) / 1000).toFixed(3);
}