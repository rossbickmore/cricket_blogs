import React from 'react';

const Blog = ({id, title, content, author, important, deleteBlog, toggleImportance}) => (
  <li>
      {title} - a blog created by {author} Importance: {important ? "true" : "false"}
      <p>{content}</p>
      <button onClick={() => deleteBlog(id)}>Delete blog</button>
      <button onClick={() => toggleImportance(id)}>Toggle importance</button>
  </li>
)

export default Blog;