import React, { useState } from 'react'

const CommentForm = ({ blogId, comment, handleCommentChange, handleSubmit }) => {

 return (
    <form onSubmit={e => handleSubmit(e, blogId)}>
      <div>
        <input
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <button type="submit">Leave a comment</button>
    </form>
 )
}

export default CommentForm