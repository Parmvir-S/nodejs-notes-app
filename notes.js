const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen.red("New note added"));
    } else {
        console.log(chalk.bgRed.green("Note title taken"));
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.title !== title)

    if (filteredNotes.length < notes.length) {
        const noteRemovedMsg = chalk.bgGreen.red("Note Removed!")
        console.log(noteRemovedMsg)
    } else {
        const noRemovedMsg = chalk.bgRed.green("No Note Found!");
        console.log(noRemovedMsg);
    }
    saveNotes(filteredNotes);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.white.bgBlue.bold("Your Notes"));
    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);
    if (findNote) {
        console.log(chalk.bgGreen(findNote.title));
        console.log(findNote.body);
    } else {
        console.log(chalk.bgRed("Note Not Found"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}