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

// When localhost
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// Respond with notes JSON when the proper route is requested.
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// RUN THE SERVER ON PORT = 3001
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})