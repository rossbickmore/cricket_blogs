import React from 'react';
import styled from 'styled-components';
import users from '../services/users';

const StyledComment = styled.div`
  margin: 3px;
  border: 1px outset black;
  padding: 3px;
`

const Comment = ({comment, user}) => {
  return (
    <StyledComment>
      <p>
        {!comment && "-"}
        {comment}
      </p>
        {!user ? "-" : <p>username: {user.username}</p> }
    </StyledComment>
  );
};

export default Comment;