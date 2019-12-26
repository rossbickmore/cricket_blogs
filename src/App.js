import React, { useState, useEffect} from 'react';
import { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.js'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const author = useField("author")
  const content = useField("content")
  const title = useField("title")
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  
  useEffect(() => {
      blogService.getAll()
      .then( data => setBlogs(data.sort( (a,b) => b.likes - a.likes)))
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

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    console.log(user)
    window.localStorage.clear()
    setUsername('')
    setPassword('')
  }

  const addBlog = e => {
    e.preventDefault()
    const newBlog = { 
      author: author.value,
      content: content.value,
      title: title.value,
      id: blogs.length + 1,
    }
    blogService.create(newBlog).then( data => setBlogs(blogs.concat(data)))
    author.reset()
    content.reset()
    title.reset()
  }

  const deleteBlog = (id) => {
    const blog = blogs.filter( (blog) => blog.id === id)[0]
    console.log(id)
    console.log(blog)
    if (window.confirm(`are you sure you want to delete ${blog.title}?`)) {
      blogService.destroy(id)
      blogs.filter(blog => blog.id !== id)
    }
  }

  const addLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(
          `Blog '${blog.content}' was already  from server`
        )
        console.log(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }
  const toggleImportance = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, important: !blog.important }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(
          `Blog '${blog.content}' was already  from server`
        )
        console.log(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


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
          <button onClick={handleLogout}>LogOut</button>
          <Togglable buttonLabel="new note">
            <BlogForm 
              author={author}
              title={title}
              content={content}
              addBlog={addBlog}
            />
          </Togglable>
        </div>
      }
      <BlogList 
        blogs={blogs} 
        deleteBlog={deleteBlog}
        toggleImportance={toggleImportance}
        addLike={addLike}
        currentUser={user}
      />
    </div>
  );
}

export default App;
