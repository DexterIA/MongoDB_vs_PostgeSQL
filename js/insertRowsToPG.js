var Client = require('pg').Client,
  utils = require('./utils'),
  client = new Client({
    user: 'postgres',
    database: 'test',
    password: 'admin'
  });

const SQL_String = "INSERT INTO test1(id, name, description, price) " +
    "SELECT " +
    "unnest(array{1}), unnest(array{2}), unnest(array{3}), unnest(array{4})",
  testedCount = 100000;

client.connect(function () {
  var dateBefore = new Date(),
    items = getRowItems(),
    config = SQL_String
      .replace('{1}', items.id)
      .replace('{2}', items.name)
      .replace('{3}', items.description)
      .replace('{4}', items.price),
    oldDate = new Date();
  console.log('Время генерации тестовых данных: ' +
    getDiffTime(oldDate, dateBefore) + ' секунд');
  client.query(config, function (err, result) {
    let newDate = new Date();
    console.log('Время вставки: ' +
      getDiffTime(newDate, oldDate) + ' секунд');
    client.end()
  });
});

function getDiffTime(newDate, oldDate) {
  let newTime = newDate.getTime(),
    oldTime = oldDate.getTime();
  return ((newTime - oldTime) / 1000).toFixed(3);
}

function getRowItems () {
  var result = {
    id: '[',
    name: '[',
    description: '[',
    price: '['
  };
  for (var i = 0; i < testedCount; i++) {
    result.id += i + getLastCharacter(i);
    result.name += '\'' + utils.getRandomString(20, 100) + '\'' + getLastCharacter(i);
    result.description += '\'' + utils.getRandomString(100, 500) + '\'' + getLastCharacter(i);
    result.price += utils.getRandomFloat(0, 9999999999.99999999999999) + getLastCharacter(i);
  }
  return result;

  function getLastCharacter (i) {
    return (i + 1) !== testedCount ? ',' : ']'
  }
}