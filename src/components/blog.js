import React, {useState} from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin: 20px;
  border: 1px outset blue;
  padding: 10px;
  h1 {
    font-weight: bold;
    color: grey;
    cursor: pointer;
  }
`

const Blog = ({id, title, content, author, important, deleteBlog, toggleImportance, user, likes}) => {
  const [expand, setExpand] = useState(false)

  const toggleExpand = () => {
    setExpand(!expand)
    console.log(expand)
  }
  return (
    <StyledDiv>
      <h4 onClick={() => toggleExpand()}>
        {title} - a blog created by {author}
      </h4>
      { !expand && 
        <div>
          <p>Importance: {important ? "true" : "false"}</p>
          <p>{content}</p>
          <button onClick={() => deleteBlog(id)}>Delete blog</button>
          <button onClick={() => toggleImportance(id)}>Toggle importance</button>
          <p>{likes || 0} likes</p> <button>like</button>
          <p>Added by {user.name}</p>
        </div>
      }
    </StyledDiv>
  )
}

export default Blog;