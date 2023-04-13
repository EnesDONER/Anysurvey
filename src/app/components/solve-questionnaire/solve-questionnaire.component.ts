import { Question } from './../../models/question';
import { Component } from '@angular/core';

@Component({
  selector: 'app-solve-questionnaire',
  templateUrl: './solve-questionnaire.component.html',
  styleUrls: ['./solve-questionnaire.component.css']
})
export class SolveQuestionnaireComponent  {
  questions:Question[]=[
  {id:1,description:'1',section1:'a',section2:'b',section3:'c',section4:'d'},
  {id:2,description:'2',section1:'a',section2:'b',section3:'c',section4:'d'},
  {id:3,description:'3',section1:'a',section2:'b',section3:'c',section4:'d'}];
  currentIndex=0;
  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.questions.length;
  }
  constructor(){}

}
