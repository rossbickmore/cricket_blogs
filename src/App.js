import React, { useState, useEffect} from 'react';
import { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.js'
import BlogList from './components/blogList'
import BlogForm from './components/blogForm'

function App() {
  const [blogs, setBlogs] = useState([])
  const author = useField("author")
  const content = useField("content")
  const title = useField("title")
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  useEffect(() => {
      blogService.getAll()
      .then( data => setBlogs(data))
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )       
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = e => {
    e.preventDefault()
    const newBlog = { 
      author: author.value,
      content: content.value,
      title: title.value,
      important: true
    }
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(newBlog),
    }
    console.log(options)
    blogService.create(options)
    author.reset()
    content.reset()
    title.reset()
  }

  const deleteBlog = (id) => {
    const options = { method: 'DElETE' }
    blogService.update(id, options)
    blogs.filter(blog => blog.id !== id)
    console.log(id)
  }

  const toggleImportance = (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      important: !blogToUpdate.important
    }
    const options = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog)
    }
    blogService.update(id,options)
    blogs.map(blog => blog.id === id ? updatedBlog : blog)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  
  return (
    <div className="App">
      <h1>
        Cricket Blogs
        by Ross Bickmore
      </h1>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h2>Add blogs {user.name}</h2>
          <BlogForm 
            author={author}
            title={title}
            content={content}
            addBlog={addBlog}
          />
        </div>
      }
      <BlogList 
        blogs={blogs} 
        deleteBlog={deleteBlog}
        toggleImportance={toggleImportance}
      />
    </div>
  );
}

export default App;
