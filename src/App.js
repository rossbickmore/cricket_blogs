import React, { useState, useEffect} from 'react';
import { useField } from './hooks'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const author = useField("author")
  const content = useField("content")
  const title = useField("title")
  
  useEffect(() => {
      blogService.getAll()
      .then( data => setBlogs(data))
  })

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
          <input {...author} reset=""/>
        </div>
        <div>
          <input {...title} reset=""/>
        </div>
        <div>
          <textarea {...content} reset=""/>
        </div>
        <div>
          <input type="submit"/>
        </div>
      </form>
    </div>
  );
}

export default App;
