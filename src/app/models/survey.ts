import { Question } from "./question";

export interface Survey{
    id:string;
    ownerUserId:number;
    title:string;
    description:string;
    questions:Question[];
}