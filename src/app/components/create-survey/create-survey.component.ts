import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent {
  infoVisible = false;
  removeInfoVisible = false;
  questionCount:number=1;
  questionAddForm:FormGroup;
  questionAddForm1:FormGroup;

  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder){}
 
  createQuestionAddForm(){
    this.questionAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice: ["",Validators.required]
    })
 }
 createQuestionAddForm1(){
  this.questionAddForm1 = this.formBuilder.group({
    productName:["",Validators.required],
    unitPrice: ["",Validators.required]
  })
}
 
  showInfo() {
    this.infoVisible = true;
  }

  hideInfo() {
    this.infoVisible = false;
  }
  showRemoveInfo() {
    this.removeInfoVisible = true;
  }

  hideRemoveInfo() {
    this.removeInfoVisible = false;
  }
  addQuestion(){
    this.questionCount = Number(1+this.questionCount);
    if(this.questionCount>5){
      this.toastrService.error("You have reached the maximum number of questions you can add.")
    }
  }
  removeQuestion(){
    this.questionCount = Number(this.questionCount-1);
  }
}
