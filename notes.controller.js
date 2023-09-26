const fs = require('fs/promises')
const path = require('path')
// const { buffer } = require('stream/consumers')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  // const notes = require('./db.json')
  // const buffer = await fs.readFile(notesPath)
  // const notes = Buffer.from(buffer).toString('utf-8')

  const notes = await getNotes()
  // console.log(notes)
  // console.log(Array.isArray(notes))
  // const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  // console.log(typeof JSON.parse(notes))
  const note = {
    title,
    id: Date.now().toString(),
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen(`Note with title: ${title} was added!`))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title))
  })
}

async function removeNotes(id) {
  const notes = await getNotes()

  await fs.writeFile(
    notesPath,
    JSON.stringify(notes.filter((note) => note.id !== id))
  )
  console.log(chalk.bgRed(`Note with id: ${id} has been removed!`))
}

module.exports = {
  addNote,
  printNotes,
  removeNotes,
}
