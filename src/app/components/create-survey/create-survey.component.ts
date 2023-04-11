import { Question } from './../../models/question';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  infoVisible = false;
  removeInfoVisible = false;
  questionCount:number=1;
  questionAddForm:FormGroup;
  questionAddForm1:FormGroup;
  questions:Question[]=[];
  

  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.createQuestionAddForm();
  }
 
  createQuestionAddForm(){
    this.questionAddForm = this.formBuilder.group({
      id:"",
      description: ["",Validators.required],
      section1: ["",Validators.required],
      section2: ["",Validators.required], 
      section3: ["",Validators.required], 
      section4: ["",Validators.required] 
    })
 }

 addQuestion(){
  if(this.questionAddForm.valid && this.questions.length<3){ 
    this.questionAddForm.get('id').setValue(1,undefined)
    console.log(this.questionAddForm.value)
    this.questions.push(this.questionAddForm.value);

    
  }else if(this.questions.length==3){
    this.toastrService.error("You have reached the maximum number of questions you can add.");
  }
  else{
    this.toastrService.error("Your form is missing");
  }
 }
 deleteQuestion(question:Question){
  let index = this.questions.indexOf(question);
  this.questions.splice(index,1);
 }
  removeQuestion(){
    this.questionCount = Number(this.questionCount-1);
  }
}
