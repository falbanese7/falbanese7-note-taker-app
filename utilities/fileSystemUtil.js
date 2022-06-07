const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
    @param {string} target
    @param {object} content 
    @returns {void} 
 */

const writeToFile = (target, content) =>
  fs.writeFileSync(target, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${target}`)
  );

// const writeToFile = util.promisify(fs.readFile);
/** 
    @param {object} content
    @param {string} file
    @returns {void}
 */

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };