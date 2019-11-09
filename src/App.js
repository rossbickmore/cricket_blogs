import React, { useState, useEffect} from 'react';
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
      blogService.getAll()
      .then( data => setBlogs(data))
  })

  const updateAuthor = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setAuthor(e.target.value)
  }

  const updateContent = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setContent(e.target.value)
  }

  const updateTitle = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setTitle(e.target.value)
  }

  const addBlog = e => {
    e.preventDefault()
    const newBlog = { 
      author,
      content,
      title,
      important: true
    }
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(newBlog),
    }
    blogService.create(options)
    setAuthor("")
    setContent("")
    setTitle("")
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
    console.log(id)
  }
  
  


  return (
    <div className="App">
      <h1>
        Cricket Blogs
      </h1>
      <ul>
        {blogs.map((blog) => 
        <li key={blog.id}>
          {blog.title} - a blog created by {blog.author} {blog.importance}
          <p>{blog.content}</p>
          <button onClick={() => deleteBlog(blog.id)}>Delete blog</button>
          <button onClick={() => toggleImportance(blog.id)}>Toggle importance</button>
        </li>
        )}
      </ul>
      <h2>Add blogs</h2>
      <form onSubmit={addBlog}>
        <div>
          <input type="text" placeholder="author's name" onChange={updateAuthor} value={author}/>
        </div>
        <div>
          <input type="text" placeholder="title" onChange={updateTitle} value={title}/>
        </div>
        <div>
          <textarea placeholder="content" onChange={updateContent} value={content}/>
        </div>
        <div>
          <input type="submit"/>
        </div>
      </form>
    </div>
  );
}

export default App;
