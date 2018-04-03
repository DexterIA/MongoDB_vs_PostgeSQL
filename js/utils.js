var utils = {};

/**
 * Возвращает случайное целое число в указанном диапазоне
 * @param {Number} min - нижняя граница
 * @param {Number} max - верхняя граница
 * @returns {Number} - случайное число
 */
utils.getRandomInt = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

/**
 * Возвращает случайное число с плавающей точкой в указанном диапазоне
 * @param {Number} min - нижняя граница
 * @param {Number} max - верхняя граница
 * @returns {Number} - случайное число
 */
utils.getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Возвращает случайный символ латинского алфавита в верхнем или нижнем регистре
 * @returns {String} - случайный символ
 */
utils.getRandomChar = function () {
  let upper = this.getRandomInt(0, 1),
    charIndex = upper ? this.getRandomInt(65, 90) : this.getRandomInt(97, 122);
  return String.fromCharCode(charIndex);
};

/**
 * Возвращает случано сгенерированную строку в указаном диапазоне длинны
 * @param {Number} minSize - нижняя граница
 * @param {Number} maxSize - верхняя граница
 * @returns {String} - случайная строка
 */
utils.getRandomString = function (minSize, maxSize) {
  var result = '',
    length = this.getRandomInt(minSize, maxSize);
  for (let i = 0; i < length; i++) {
    result += this.getRandomChar();
  }
  return result;
};

module.exports = utils;