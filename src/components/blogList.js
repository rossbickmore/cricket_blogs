import React from 'react';
import Blog from './Blog'

const BlogList = ({blogs, deleteBlog, addLike, currentUser, comment, handleCommentChange, handleSubmit}) => (
  <div>
    {blogs.map((blog) => 
      <Blog
        {...blog}
        key={blog.id}
        deleteBlog={deleteBlog}
        addLike = {addLike}
        currentUser = {currentUser}
        comment={comment}
        handleCommentChange={handleCommentChange}
        handleSubmit={handleSubmit}
      />
    )}
  </div>
);

export default BlogList;