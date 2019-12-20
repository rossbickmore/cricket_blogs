import React, { useState, useEffect} from 'react';
import { useField } from './hooks'
import blogService from './services/blogs'
import BlogList from './components/blogList'
import BlogForm from './components/blogForm'

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
  }
  
  return (
    <div className="App">
      <h1>
        Cricket Blogs
        by Ross Bickmore
      </h1>
      <BlogList 
        blogs={blogs} 
        deleteBlog={deleteBlog}
        toggleImportance={toggleImportance}
      />
      <h2>Add blogs</h2>
      <BlogForm 
        author={author}
        title={title}
        content={content}
        addBlog={addBlog}
      />
    </div>
  );
}

export default App;
