import { SurveyService } from 'src/app/services/survey.service';
import {  ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  surveys:Survey[];
  dataLoaded:Boolean=false;
  constructor(private toastrService:ToastrService, private surveyService:SurveyService) {}

  ngOnInit(): void {
    this.getAllUnWatchedAd();
  
  }
  getAllUnWatchedAd(){
    this.surveyService.getAllUnsolvedSurveys().subscribe
    (response=>{this.surveys = response.data;
      this.dataLoaded=true;
      if(response.data.length==0){
        this.toastrService.error("No resolvable questionnaire was found.")
      }
    },
    responseError=>{this.toastrService.error(responseError.error)})
  }

}
