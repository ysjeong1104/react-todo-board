import React from "react";
import {useForm} from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { Area, Board as Wrapper, Form, Title } from "../styles/ToDoStyle";
import { IBoard } from "../interface/interface";
import {  useSetRecoilState } from "recoil";
import { boardState } from "../states/atoms";

interface IParam{
    board : IBoard;
    idx : number;
}

interface IForm {
    toDo : string;
}

const Board=({board :{toDos,id,name},idx} : IParam)=>{

    const {handleSubmit,register,setValue} = useForm<IForm>();
   // const setToDos = useSetRecoilState(toDoState);
    const setBoard = useSetRecoilState(boardState);

  //  const inputRef = useRef<HTMLInputElement>(null); //getElementById 와 같은 기능으로 사용가능 
   
    const onValid=({toDo}:IForm)=>{
        console.log(toDo);

        setBoard((oldBoards)=> {            


           // oldBoards[idx] = 
           // const tempBoard  = oldBoards.at(idx);
           // tempBoard.toDos =  [{id:Date.now(),text : toDo},...tempBoard.toDos];

           // oldBoards[idx] = tempBoard;

           return oldBoards.map((board)=>{
                if(board.id === id)
                    return {...board,toDos : [{id:Date.now(),text : toDo},...board.toDos]};
                else 
                    return board;
           })

            //return oldBoards
           /* return {...oldToDos,
                [id] : [{id:Date.now(),text:toDo},...oldToDos[id]]
            }*/

        })
        setValue("toDo","");
    }   
    const onDeleteBoard=()=>{
        if(window.confirm(`${name} 을(를) 삭제 하시겠습니까?`)){
            setBoard((oldBoards)=> {   

                return [...oldBoards.filter((board)=> board.id !== id)];
                
            })
        }
    }
    return (
        <Draggable draggableId={id+""} index={idx} key={id}>
        {(props)=><Wrapper ref={props.innerRef} {...props.dragHandleProps} {...props.draggableProps}>            
            
            <Title>
                {name}
                <button style={{width:'30px', position:'relative', top:'0px', left:'90px' ,right:'10px'}} onClick={onDeleteBoard}>❌</button>
            </Title>
            
            <Form onSubmit={handleSubmit(onValid)}>
            <input type='text' {...register("toDo",{required: true})} placeholder={`Add task on ${name}`}/>            
            </Form>
            <Droppable droppableId={id+""} type='todo'>
                {/* prop :  */}
                {(prop,snapshot)=>                    
                    <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}  ref={prop.innerRef} {...prop.droppableProps}>
                        {/*  Draggable 에서는 key, draggableId 동일한 값 사용*/}
                        {/*  ref : react 코드를 이용해 HTML 요소를 지정하고 가져올수 있음 */}
                        { 
                        toDos.map((todo,index) => <DraggableCard key={index} index={index} todo={todo} />)
                        }
                        {prop.placeholder}
                    </Area>                    
                }
            </Droppable>
        </Wrapper>}
        </Draggable>
    );
}

export default React.memo(Board);