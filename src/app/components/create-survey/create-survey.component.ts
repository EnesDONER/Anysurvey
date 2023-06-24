import { Survey } from './../../models/survey';
import { Question } from './../../models/question';
import { ToastrService } from 'ngx-toastr';
import { Component,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  isItPaid: boolean=false;
  currentQuestionId:number=0;
  fee:number=0;
  survey: Survey = {
    id: '',
    title: '',
    description: '',
    questions: []
  };
  isTitleEmpty: boolean = false;
  isDescriptionEmpty: boolean = false;
  isQuestionEmptyError :boolean= false;
  optionCount:number=1;
  questionCount:number=0;
  questionDescription:string="";
  surveyTitle:string="";
  surveyDescription:string="";
  options: string[] = [];
  constructor(private toastrService:ToastrService, private formBuilder:FormBuilder, private surveyService:SurveyService){}
  ngOnInit(): void {
    
  }
 
  receiveData(data: boolean) {
    this.isItPaid = data;
    console.log(this.isItPaid)
    if(this.isItPaid){
      this.addSurvey();
      data=false;
    }
  }
  getCountArray(count: number): number[] {
    return Array(count).fill(0).map((x, i) => i);
  }
  
  addOption(){
    if(this.options[this.optionCount-1]==null){
      this.toastrService.error("d")
      return;
    }
    this.optionCount+=1;
  }
  addQuestion() {
    if(this.questionDescription !=""){
      if(this.options.length<2){
        this.toastrService.error("You must add at least 2 options");
        return;
      }
      console.log(this.options)
      const question: Question = {
        description: this.questionDescription,
        options: this.options.map(option => ({ description: option }))
      };
      console.log(question)
    this.survey.questions.push(question);

    this.isQuestionEmptyError=false;
    this.questionDescription = '';
    this.options = [];
    this.optionCount=1;
    }
    else
      this.toastrService.error("Question descripton cannot be null");
      
  }
  setCurrentQuestion(index:number){
    this.currentQuestionId=index;
  }
  checkIfSurveyNull(){
    this.isTitleEmpty = this.surveyTitle.trim() === '';
    this.isDescriptionEmpty = this.surveyDescription.trim() === '';
    if (this.isTitleEmpty || this.isDescriptionEmpty)
      return false; 
    if(this.survey.questions.length < 1){
      this.isQuestionEmptyError =true;
      this.toastrService.error("You must add at least 1 question");
      return false;
    }
    this.fee= this.survey.questions.length *10;
    var payModal = new bootstrap.Modal(document.getElementById('payModal'));
      payModal.show();
    return true;
    
  }

  addSurvey(){
    this.survey.title= this.surveyTitle;
    this.survey.description = this.surveyDescription;
    console.log(this.survey)
    let surveyModel = Object.assign({},this.survey)
    this.surveyService.add(surveyModel).subscribe(response=>{
      this.toastrService.success(response.message,"The survey successfully added ")
      this.survey = {
        id: '',
        title: '',
        description: '',
        questions: []
      };
      this.surveyTitle="";
      this.surveyDescription="";
    },
    responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Error")
          }       
        } 
    })

  }
}
