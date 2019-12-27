import React from 'react';
import Blog from './Blog'

const BlogList = ({blogs, deleteBlog, addLike, currentUser, comment, handleCommentChange, handleSubmit, users}) => (
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
        users={users}
      />
    )}
  </div>
);

export default BlogList;