import { Question } from "./question";

export interface Survey{
    id:string;
    title:string;
    description:string;
    questions:Question[];
}