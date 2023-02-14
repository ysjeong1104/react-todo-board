import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITodo } from '../interface/interface';
import { Card } from '../styles/ToDoStyle';

interface IParams{
    todo : ITodo;
    index : number    
}
const DraggableCard=({todo , index} : IParams)=>{
    return (
        <Draggable key={todo.id} draggableId={''+todo.id} index={index}> 
        {
            (prop, snapshot)=> 
                <Card isDragging={snapshot.isDragging}  ref={prop.innerRef} {...prop.draggableProps} {...prop.dragHandleProps} >                      
                    {todo.text}
                </Card>                      
        }
        </Draggable>
        
    );
}

export default React.memo( DraggableCard); //영향을 받는 인덱스만 랜더링 해주기 위해서 React.memo 사용 