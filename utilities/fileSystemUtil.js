// This file is a more organized way to handle file system functions.
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
    @param {string} target
    @param {object} content 
    @returns {void} 
 */

const writeToFile = (target, content) => fs.writeFileSync(target, JSON.stringify(content, null, 4), (err) => err ? console.log(err) : console.log(`\nData written to ${target}`));
// const writeToFile = util.promisify(fs.readFile);
/** 
    @param {object} content
    @param {string} file
    @returns {void}
 */

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const parsed = JSON.parse(data);
      parsed.push(content);
      writeToFile(file, parsed);
    }
  });
};

module.exports = { readFromFile, readAndAppend };