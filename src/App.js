import React, { useState, useEffect} from 'react';


function App() {
  const [blogs, setBlogs] = useState([])
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  const url = "http://localhost:3000/blogs"
  
  useEffect(() => {
    fetch(url)
      .then( response => response.json())
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
      author: author,
      content: content,
      title: title
    }
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(newBlog),
    }
    fetch(url, options)
    .then((res) => res.json())
    .then(data =>console.log(data))
    setAuthor("")
    setContent("")
  }


  return (
    <div className="App">
      <h1>
        Cricket Blogs
      </h1>
      <ul>
        {blogs.map((blog) => 
        <li key={blog.id}>
          {blog.title} - a blog created by {blog.author}
          <p>{blog.content}</p>
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
