import styled from "styled-components";

declare module 'styled-components'{

    export interface DefaultTheme {
        bgColor : string;      
        boardColor : string;
        cardColor : string;
    }
}