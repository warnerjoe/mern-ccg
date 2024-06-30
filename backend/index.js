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

// Request logger - prints request info to console
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

app.use(requestLogger)
app.use(express.json())

// Unknown endpoint handler
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

// When localhost:3001/ is requested, respond with a hello world message.
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

// When localhost:3001/api/notes is reqed, respond with the notes array in JSON format.
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

// When localhost:3001/api/notes/1 is reqed, respond with the note with id 1.
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => String(note.id) === id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
})

// Generate a new id for a new note.  Calculates number of notes and adds 1.
const generateId = () => {
    const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return String(maxId + 1)
}

// When a POST request is made to /api/notes, a new note is created.
app.post('/api/notes', (req, res) => {
    const body = req.body
  
    // Send a 400 status for a bad request if the data is missing a value for "content"
    if (!body.content) {
      return res.status(400).json({ 
        error: 'content missing' 
      })
    }

    const note = {
      content: body.content,
      important: Boolean(body.important) || false, // Default for important is false
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    res.json(note)
})

// Delete a note with a specific id when a DELETE request is made to /api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

app.use(unknownEndpoint)

// RUN THE SERVER ON PORT = 3001
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})