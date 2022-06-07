const notes = require('express').Router();
const note = require('../db/db.json');
const {readFromFile, writeToFile, readAndAppend } = require('../utilities/fileSystemUtil')
const {v4: uuidv4} = require('uuid');


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for retrieving notes.`);
    readFromFile('./db/db.json', 'utf-8').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received for adding notes.`);

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note logged successfully.')
    } else {
        res.end('Error adding note.')
    } 
});

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for deleting notes.`);
    const id = req.params.id;

})
module.exports = notes;