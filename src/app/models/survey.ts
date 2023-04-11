import { Question } from "./question";

export interface Survey{
    id:number;
    description:string;
    theme:string;
    question1:Question;
    question2:Question;
    question3:Question;
    question4:Question;
    question5:Question;
}