import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateMessage, deleteMessage } from '../global/MessageReducer';


const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1vh;
    background-color: white;
    border-radius: 2vh;
    margin-top: 2vh;
    align-items: center;
    justify-content: space-between;
    margin-left: ${props => props.level * 3}vh;
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    overflow-wrap: anywhere;
`

const EditButton = styled.div`
    background: #F0E68C;
    margin: 1vh;
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
`

const DeleteButton = styled.div`
    background: blanchedalmond;
    margin: 1vh;
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
`

const NameDiv = styled.h3`
    margin: 1vh;
    overflow-wrap: anywhere;
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1vh;
  width: -webkit-fill-available;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.5vh;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  width: 20%;
  background: orange;
  cursor: pointer;
`;

export const InputField = styled.input`
  padding: 0.5vh 2vh;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 15vh;
`;

export const AddButton = styled.button`
  background: #F0E68C;
  margin-left: 1vh;
  border-radius: 10px;
  cursor: pointer;
`;

export const getID = (obj) => {
  let maxChildID = 0;

  if (Array.isArray(obj.child)) {
      for (let child of obj.child) {
      if (child.id > maxChildID) {
          maxChildID = child.id;
      }
      }
  }

  return obj.id * 10 + (maxChildID % 10) + 1;
};


const TreeExpansion = ({tree,level = 0}) => {
    const [showReplyFields, setShowReplyFields] = useState({});
    const [textFiled, setTextField] = useState('');

    const dispatch = useDispatch();

    const replyMessage = (item,index)=> {
        setShowReplyFields(prevState => ({...prevState,[index]: true}));
    }
    
      const closeReplyField = (index) => {
        setShowReplyFields(prevState => ({...prevState,[index]: false}));
      };

      const addReply = (item,index) => {
        const newArray = [...(item.child.length !== 0 ? item.child : []),
                {
                  id: getID(item),
                  name: textFiled,
                  child: [],
                },
              ];
              dispatch(updateMessage({ id: item.id, name: item.name, child : newArray }))
              setTextField('');
              closeReplyField(index);
      };

      const deleteReply = (item,index) => {
        dispatch(deleteMessage({ id: item.id }))
        closeReplyField(index);
      }


  return (
    <div>
      {
        tree.map((item, index)=> (
            <React.Fragment key={index}>
                <Card level={level}>
                  <NameDiv>{item.name}</NameDiv>
                    <Buttons>
                        <EditButton onClick={()=>replyMessage(item,index)} >Reply</EditButton>
                        {showReplyFields[index] && (
                            <InputContainer>
                            <InputField type="text" placeholder="Reply a name" value={textFiled} onChange={(e)=>setTextField(e.target.value)}/>
                            <CloseButton onClick={() => closeReplyField(index)}>
                                <span>&times;</span>
                            </CloseButton>
                            <AddButton onClick={() => addReply(item,index)}>Add</AddButton>
                            </InputContainer>
                        )}
                        <DeleteButton onClick={() => deleteReply(item,index)}>Delete</DeleteButton>
                    </Buttons>
                </Card>
                {
                    item.child !== null && <TreeExpansion tree={item.child} level={level + 1}/>
                }
            </React.Fragment>
        ))
      }
    </div>
  )
}

export default TreeExpansion
