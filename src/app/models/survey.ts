import { Question } from "./question";

export interface Survey{
    id:number;
    title:string;
    description:string;
    questions:Question[];
}