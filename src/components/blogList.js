import React from 'react';
import Blog from './Blog'

const BlogList = ({blogs, deleteBlog, toggleImportance, addLike, currentUser}) => (
  <div>
    {blogs.map((blog) => 
      <Blog
        {...blog}
        key={blog.id}
        deleteBlog={deleteBlog}
        toggleImportance = {toggleImportance}
        addLike = {addLike}
        currentUser = {currentUser}
      />
    )}
  </div>
);

export default BlogList;