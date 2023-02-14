export interface ITodo{
    id : number;
    text : string;
}
export interface ITodoState{
    [key:string] : ITodo[];
}

export interface IBoard{
    id : number;
    name : string;
    toDos : ITodo[];
}