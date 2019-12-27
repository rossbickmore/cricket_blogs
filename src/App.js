import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Home from './components/Home'
import styled from 'styled-components'

const Page = styled.div`
  background: papayawhip;
  min-height: 100vmin;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
  a {
    margin-left: 2%;
  }
`

const Footer = styled.div`
  position: absolute;
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
  bottom: 0px;
  width: 100%;
`

function App() {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const author = useField("author")
  const content = useField("content")
  const title = useField("title")
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  useEffect(() => {
      blogService.getAll()
      .then( data => setBlogs(data.sort( (a,b) => b.likes - a.likes)))
      userService.getAll()
      .then( data => setUsers(data))
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

  const addComment = (e, blogId)=> {
    e.preventDefault()
    const newComment = { 
      comment: comment,
    }
    console.log(comment)
    blogService.createComment(newComment, blogId).then( data => setComments(comments.concat(data)))
    setComment('')
  }

  const deleteBlog = (id) => {
    const blog = blogs.filter( (blog) => blog.id === id)[0]
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
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  return (
    <Page>
      <Router>
        <div>
          <Navigation>
            {!user && 
            <div>
              <Link to="/blogs">Blogs</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
            </div>
            }
            {user && 
              <div>
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/users">Users</Link>
                <Link to="/create">Write a blog</Link>
                <Link onClick={handleLogout}>Logout</Link>
              </div>
            }
          </Navigation>
          <Route path="/" render={() =>
           user ? <Home user={user}/> : <Redirect to="/login"/>
          } />
          <Route exact path="/blogs" render={() =>
            <BlogList 
              blogs={blogs} 
              deleteBlog={deleteBlog}
              addLike={addLike}
              currentUser={user}
              comment={comment}
              handleCommentChange={({ target }) => setComment(target.value)}
              handleSubmit={addComment}
              users={users}
            />}
          />
          <Route path="/login" render={() =>
            user ? <Redirect to="/"/> : loginForm()}
          />
          <Route path="/create" render={() =>
            <BlogForm
              addBlog={addBlog}
              author={author}
              title={title}
              content={content}
            /> }
          />
          <Route path="/signup" render={() => <SignUpForm handleLogin={handleLogin}/>}/>
        </div>
      </Router>
      <Footer>
        Bloging app made by Ross Bickmore
      </Footer>
    </Page>
  );
}

export default App;
