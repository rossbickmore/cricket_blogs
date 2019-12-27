import React, {useState} from 'react';
import styled from 'styled-components';
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

const StyledDiv = styled.div`
  margin: 20px;
  border: 1px outset blue;
  padding: 10px;
  h4 {
    font-weight: bold;
    color: grey;
    cursor: pointer;
  }
`

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`


const Blog = ({id, title, content, author, important, deleteBlog, user, likes, addLike, currentUser, comments, comment, handleCommentChange, handleSubmit, users}) => {
  const [expandBlog, setExpandBlog] = useState(true)
  const [expandComments, setExpandComments] = useState(true)

  const toggleExpandBlog = () => {
    setExpandBlog(!expandBlog)
  }

  const toggleExpandComments = () => {
    setExpandComments(!expandComments)
  }
  return (
    <StyledDiv>
      <h4 onClick={() => toggleExpandBlog()}>
        {title} - a blog created by {author}
      </h4>
      { !expandBlog && 
        <div>
          <p>Importance: {important ? "true" : "false"}</p>
          <p>{content}</p>
          {currentUser && user.username === currentUser.username && <Button onClick={() => deleteBlog(id)}>Delete</Button> }
          <p>{likes || 0} likes</p> <Button onClick={() => addLike(id)}>like</Button>
          <p>Added by {user.username}</p>
          <h5>Comments</h5>
          <CommentForm blogId={id} handleSubmit={handleSubmit} handleCommentChange={handleCommentChange} comment={comment}/>
          <button onClick={() => toggleExpandComments()}>See comments</button>
          {!expandComments &&
            comments.map( item => <Comment comment={item.comment} user={users.find( user => user.id === item.user )}/>).reverse()}
        </div>
      }
    </StyledDiv>
  )
}

export default Blog;