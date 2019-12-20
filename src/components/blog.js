import React from 'react';

const Blog = ({id, title, content, author, importance, deleteBlog, toggleImportance}) => (
  <li>
      {title} - a blog created by {author} {importance}
      <p>{content}</p>
      <button onClick={() => deleteBlog(id)}>Delete blog</button>
      <button onClick={() => toggleImportance(id)}>Toggle importance</button>
  </li>
)

export default Blog;