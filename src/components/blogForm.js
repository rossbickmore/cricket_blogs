import React from 'react';

const BlogForm = ({addBlog, author, title, content}) => (
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
);

export default BlogForm;