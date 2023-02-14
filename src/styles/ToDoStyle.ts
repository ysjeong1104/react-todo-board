import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    max-width: 800px;
    width: 100%;
    margin : 0 auto;
    justify-content: center;
    align-items : center;
    height : 100vh ;

`
export const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    width : 100%;
    gap : 10px;
`
export const Board = styled.div`
    background-color: ${(props)=>props.theme.boardColor};  
    //padding-top : 30px;
    padding-top : 10px;  
    border-radius: 5px;
    min-height: 300px;
    width : 300px;
    display: flex;
    flex-direction: column;

`

export const Card = styled.div<{isDragging:boolean}>`    
    padding : 10px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${(props)=> props.isDragging ? '#74b9ff' : props.theme.cardColor};
    box-shadow: ${(props)=>props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`
export const Title=styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size : 18px;
`

export const MainTitle = styled(Title)`
    margin-top : 30px;
`

interface IAreaProps{
    isDraggingOver : boolean;
    isDraggingFromThis : boolean;
}
export const Area = styled.div<IAreaProps>`
    background-color: ${(props)=>props.isDraggingOver? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding : 20px;
`
export const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    input {
        font-size: 16px;
        border: 0;
        background-color: white;
        width: 80%;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
    }
   
`
export const BoardForm = styled(Form)`
    input {
        font-size: 16px;
        border: 0;
        background-color: white;
        width: 50%;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        margin: 10px;
    }
    button{
        height : 40px;
        font-size: 16px;
        border-radius:5px;
        padding : 10px;
        margin : 10px 0px 10px 0px;
    }
`

export const TrashArea = styled.div`
    
    position: fixed;
    bottom: 20px;
    right: 20px;
    width : 220px;
    height : 60px;

  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
    
`

export const TrashCan = styled.div`

    position: fixed;
    bottom: 20px;
    right: 20px;
    width : 220px;
    height : 60px;
    border: none;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    border-radius: 16px;
    background: royalblue;
    color: white;
    padding: 20px;
    font-weight: bold;
    box-shadow: 0px 5px 15px gray;
    cursor: pointer;

`