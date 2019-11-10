const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let blogs = [
  {
    author: "Ian",
    id: 1,
    content: "HTML is easy",
    title: "2019-05-30T17:30:31.098Z",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/blogs', (req, res) => {
  res.json(blogs)
})

app.get('/blogs/:id', (request, response) => {
  const id = Number(request.params.id)
  const blog = blogs.find(blog => blog.id === id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
  response.json(blog)
})

app.post('/blogs', (request, response) => {
  const maxId = blogs.length > 0
    ? Math.max(...blogs.map(n => n.id)) 
    : 0
  const blog = request.body
  blog.id = maxId + 1

  blogs = blogs.concat(blog)

  response.json(blog)
})

app.delete('/blogs/:id', (request, response) => {
  const id = Number(request.params.id)
  blogs = blogs.filter(blog => blog.id !== id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = 3002
app.listen(port)
console.log(`Server running on port ${port}`)