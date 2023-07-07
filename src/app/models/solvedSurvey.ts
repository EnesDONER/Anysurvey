import { QuestionAnswer } from "./questionAnswer";

export interface SolvedSurvey{
    userId:number;
    surveyId:string;
    questionsAnswers:QuestionAnswer[];
}