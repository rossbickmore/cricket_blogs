import React from 'react';
import styled from 'styled-components';

const StyledComment = styled.div`
  margin: 3px;
  border: 1px outset black;
  padding: 3px;
`

const Comment = ({comment}) => {
  return (
    <StyledComment>
      <p>
        {!comment && "-"}
        {comment}
      </p>
    </StyledComment>
  );
};

export default Comment;