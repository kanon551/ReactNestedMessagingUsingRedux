import React, { useState } from 'react'
import styled from 'styled-components';
import TreeExpansion, { InputField } from './TreeExpansion';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../global/MessageReducer';

const CommentsContainer = styled.div`
    background-color: #F0FFFF;
    padding: 1vh;
    padding-bottom: 5vh;
    height: fit-content;
`

const FieldButton = styled.div`
  display: flex;
`

const Send = styled.div`
  display: flex;
  margin-left: 3vh;
  background: yellow;
  padding: 0.5vh;
  border-radius: 4px;
  cursor: pointer;
`



const Comments = () => {
  const dispatch = useDispatch();
    const comments = useSelector((state) => state.messages);
    const [newName, setNewName] = useState('');

    const AddNew = ()=> {
      if(newName === ''){
        alert("Add Name");
      }
      else{
        dispatch(addMessage({ id: comments[comments.length - 1].id + 1, name: newName, child : [] }))
        setNewName('');
      }
   
    }

  return (
    <CommentsContainer>
        <h1>Comments</h1>
        <FieldButton>
        <InputField type="text" placeholder="Add a name" value={newName} onChange={(e)=>setNewName(e.target.value)}/>
        <Send onClick={AddNew} >Send</Send>
        </FieldButton>
       
        <TreeExpansion tree={comments}/>
    </CommentsContainer>
  )
}

export default Comments
