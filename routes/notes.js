const notes = require('express').Router();
const fs = require('fs');
const {readFromFile, readAndAppend } = require('../utilities/fileSystemUtil')
const {v4: uuidv4} = require('uuid');

// GET request
notes.get('/', (req, res) => {
    console.log(`${req.method} request received for retrieving notes.`);
    readFromFile('./db/db.json', 'utf-8').then((data) => res.json(JSON.parse(data)));
});

// POST request
notes.post('/', (req, res) => {
    console.log(`${req.method} request received for adding notes.`);

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

// DELETE request
notes.delete('/:id', (req, res) => {
    console.log(`${req.method} request received for deleting notes.`);
    
    readFromFile('./db/db.json', 'utf-8', (err, data) => {
        const noteId = req.params.id;
        console.log(noteId);
        let noteDb = JSON.parse(data);

        noteDb = noteDb.filter((note) => {
            if(noteId != note.id) {
                return true;
            } else {
                return false;
            };
        });
        fs.writeFile('./db/db.json', JSON.stringify(noteDb), (error) => {
            if (error) throw (error);
            res.end('Note deleted.');
        });
    });
});

module.exports = notes;