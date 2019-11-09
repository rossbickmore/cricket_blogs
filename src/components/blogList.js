import React from 'react';
import Blog from '../components/blog'

const BlogList = ({blogs, deleteBlog, toggleImportance}) => (
  <ul>
    {blogs.map((blog) => 
      <Blog
        {...blog}
        key={blog.id}
        deleteBlog={deleteBlog}
        toggleImportance = {toggleImportance}
      />
    )}
  </ul>
);

export default BlogList;