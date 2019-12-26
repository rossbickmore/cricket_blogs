import React from 'react';
import Blog from './Blog'

const BlogList = ({blogs, deleteBlog, toggleImportance}) => (
  <div>
    {blogs.map((blog) => 
      <Blog
        {...blog}
        key={blog.id}
        deleteBlog={deleteBlog}
        toggleImportance = {toggleImportance}
      />
    )}
  </div>
);

export default BlogList;