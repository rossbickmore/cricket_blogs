import React from 'react';
import styled from 'styled-components'  

const Input = styled.input`
  margin: 0.25em;
`


const BlogForm = ({addBlog, author, title, content}) => (
  <form onSubmit={addBlog}>
        <div>
          <Input {...author} reset=""/>
        </div>
        <div>
          <Input {...title} reset=""/>
        </div>
        <div>
          <textarea {...content} reset=""/>
        </div>
        <div>
          <Input type="submit"/>
        </div>
  </form>      
);

export default BlogForm;