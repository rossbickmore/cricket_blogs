import React from 'react';
import Blog from './Blog'

const BlogList = ({blogs, deleteBlog, toggleImportance, addLike}) => (
  <div>
    {blogs.map((blog) => 
      <Blog
        {...blog}
        key={blog.id}
        deleteBlog={deleteBlog}
        toggleImportance = {toggleImportance}
        addLike = {addLike}
      />
    )}
  </div>
);

export default BlogList;