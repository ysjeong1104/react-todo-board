import {atom,selector} from "recoil";
import { IBoard, ITodoState } from "../interface/interface";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key : "persistBoard",
    storage : localStorage
})

export const toDoState = atom<ITodoState>({
    key : "toDo",
    default : {
        
    }
})

export const boardState = atom<IBoard[]>({
    key : "boards",
    default : [],
    effects_UNSTABLE : [persistAtom]

})

export const minuteState  = atom({
    key : "minuteState",
    default : 0
})

export const hourSelector = selector({
    key : "hours",
    get : ({get})=>{
        const minute = get(minuteState);
        return minute/60;
    },
    set : ({set},newValue)=>{
        
        const minute = Number(newValue)*60;
        set(minuteState,minute)
        //console.log(newValue);
        //set(minuteState,10);
    }
})