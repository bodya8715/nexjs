export default async function handler(req, res) {
  const path = require('path');
  const fs = require('fs').promises;

  const directoryPath = path.join('public', '/images');
  const filesList = await fs.readdir(directoryPath);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let imagesQuantity = getRandomIntInclusive(1, 10);

  let sendData = [];

  for (let i = 0; i <= imagesQuantity; i++) {
    sendData.push({image: filesList[getRandomIntInclusive(0, filesList.length-1)], id: Math.random()});
  }

  res.status(200).json({ value: sendData});
}
