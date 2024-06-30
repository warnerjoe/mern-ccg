const express = require('express')
const app = express()

// A manual database of /api/notes
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

// When localhost:3001/ is requested, respond with a hello world message.
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
})

// When localhost:3001/api/notes is requested, respond with the notes array in JSON format.
app.get('/api/notes', (request, response) => {
    response.json(notes);
})

// When localhost:3001/api/notes/1 is requested, respond with the note with id 1.
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => String(note.id) === id);

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
})

// RUN THE SERVER ON PORT = 3001
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})