import React from 'react';
import { useRecoilState } from 'recoil';
import { boardState } from './states/atoms';
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd"
import { BoardForm, Boards, MainTitle,  TrashArea,  TrashCan,  Wrapper } from './styles/ToDoStyle';
import  Board  from "./Components/Board";
import { useForm } from 'react-hook-form';
import Trash from './Components/Trash';


interface IForm {
  boardName : string;
}
function App() {


 // const [toDos,setToDos] = useRecoilState(toDoState);
  const [boards,setBoards] = useRecoilState(boardState);

  const {handleSubmit,register,setValue} = useForm<IForm>()
  const onDragEnd=( info:DropResult)=>{
    console.log(info);

    const {destination,source,type} = info

    if(type === "board"){      
      setBoards((oldBoards)=>{
        const boardsCopy = [...oldBoards];

        if(destination){
          const temp = boardsCopy?.at(source.index);
          if(temp){
            boardsCopy.splice(source.index,1);        
            boardsCopy.splice(destination?.index,0,temp);
          }
        }
        return boardsCopy;

      });

    }else if(destination && destination.droppableId ==="trash"){
      setBoards((oldBoards)=>{         
          const sourceTodos = [...oldBoards.find((board)=>board.id === Number(source.droppableId))?.toDos ?? []] ;
          sourceTodos.splice(source.index,1)
          return oldBoards.map((board)=>{
            if(board.id === Number(source.droppableId))
              return {...board,toDos : sourceTodos};
            else 
                return board;
          });
        }
          //return oldBoards;
      )
    }else{
      if(destination?.droppableId === source.droppableId){

        setBoards((oldBoards)=>{
          
          if(destination){         
            const todosCopy = [...oldBoards.find((board)=>board.id === Number(destination.droppableId))?.toDos ?? []] ;  
          // console.log(todosCopy);
            const temp = todosCopy?.at(source.index);
            if(temp){
              todosCopy.splice(source.index,1);            
              todosCopy.splice(destination.index,0,temp);
            }
            //{...oldTodos, destination.droppableId : todosCopy};
            return oldBoards.map((board)=>{
              if(board.id === Number(destination.droppableId))
                  return {...board,toDos : todosCopy};
              else 
                  return board;
            });
          }
          else
            return oldBoards;
        })
        //같은 board안에서의 이동
      }
      else{

        setBoards((oldBoards)=>{
          const sourceTodos = [...oldBoards.find((board)=>board.id === Number(source.droppableId))?.toDos ?? []] ;
          const destTodos = [...oldBoards.find((board)=>board.id === Number(destination?.droppableId))?.toDos ?? []] ; 
          //const destBoard = destination ? [...oldTodos[destination?.droppableId]] : [];

          if(destination){
            const temp = sourceTodos.at(source.index);
            if(temp){
              sourceTodos.splice(source.index,1);
              destTodos.splice(destination?.index,0,temp);
            }
            return oldBoards.map((board)=>{
              if(board.id === Number(destination.droppableId))
                return {...board,toDos : destTodos};
              else if(board.id === Number(source.droppableId))
                return {...board,toDos : sourceTodos};
              else 
                  return board;
            });
          }
          else
            return oldBoards;
        })
        
        //console.log("a");
        //다른 board로 이동
      }

    }
  /*  setToDos(oldTodos=>{
      let tempTodos = Object.keys(oldTodos).filter(boardId=> boardId === draggableId);
    
     tempTodos.splice(source.index,1);

      if(destination)
        tempTodos.splice(destination?.index,0,draggableId)
      return {...oldTodos,draggableId : tempTodos}
    });*/
    
  }

  

  const onValid=({boardName}:IForm)=>{    

    
    setBoards((oldBoards)=>{
        return [...oldBoards,{id : Date.now(), name:boardName,toDos : []}];
      //return oldBoards;
    })    
    setValue("boardName","");

  }

  window.addEventListener("scroll",()=>{

  })

  return (
    <>
      <MainTitle>ToDo Board</MainTitle>
      <BoardForm onSubmit={handleSubmit(onValid)}>
        <input type="type" {...register("boardName",{required:true})} placeholder='input create board name'/>
        <button>Add Board</button>
      </BoardForm>
      <DragDropContext onDragEnd={onDragEnd}>        
        <Wrapper>   
          <Droppable droppableId='boards' type="board" direction='horizontal'>
          {
            (props)=>
            <Boards ref={props.innerRef} {...props.droppableProps}>
            {
              boards.map((board, idx) => <Board board={board} key={board.id} idx={idx}/> )
            }
            {props.placeholder}
            </Boards>
            
          }          
          </Droppable>  
            
        </Wrapper>
        <Trash />
      </DragDropContext>
    </>

  );
}

export default App;
