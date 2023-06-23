import { Survey } from './../../models/survey';
import { Question } from './../../models/question';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';


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
  @Input() survey:Survey;

  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder, private surveyService:SurveyService){}
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
  createSurvey(){
    if(this.questionAddForm.valid){

      let productModel = Object.assign({},this.questionAddForm.value)

      this.surveyService.add(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success")
      },
      responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Validation Rules")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
}
