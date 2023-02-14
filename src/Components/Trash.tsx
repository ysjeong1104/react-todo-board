import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { TrashArea,TrashCan } from "../styles/ToDoStyle";

const Trash = ()=>{

    return (
        <Droppable droppableId='trash' type='todo' direction='vertical'>
        {(props) => 
          <TrashArea ref={props.innerRef} {...props.droppableProps}>                 
            {props.placeholder}
            <TrashCan>Drop here Todo Delete ❌</TrashCan>
          </TrashArea>}
        </Droppable>  
    );
}

export default Trash;