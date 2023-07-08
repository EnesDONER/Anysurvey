import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SurveyFilter } from './../../models/surveyFilter';
import { Survey } from './../../models/survey';
import { SolvedSurvey } from './../../models/solvedSurvey';
import { StatisticsService } from './../../services/statistics.service';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/services/survey.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-survey-statistics',
  templateUrl: './survey-statistics.component.html',
  styleUrls: ['./survey-statistics.component.css']
})
export class SurveyStatisticsComponent {

  surveys:Survey[]=[];
  solvedSurveys:SolvedSurvey[]=[];
  surveyFilter:SurveyFilter=null;
  users : User[]=[];
  surveyFilterForm:FormGroup;
  userData: Boolean=false;
  constructor(private surveyService:SurveyService,private formBuilder:FormBuilder,private statisticsService:StatisticsService , private toastrService:ToastrService) {
  }
  ngOnInit(){
    this.getAllSurveyByOwnerUserId();
    this.createAdFilterForm();
  }
  createAdFilterForm() {
    this.surveyFilterForm = this.formBuilder.group({
      surveyId: ["", Validators.required],
      minAge: [null, Validators.pattern(/^[0-9]*$/)],
      maxAge: [null, Validators.pattern(/^[0-9]*$/)],
      genderId: null
    });
  }
  updateSurveyFilter(surveyId:string){
      this.surveyFilterForm.get('surveyId').setValue(surveyId,undefined)
      
      if(this.surveyFilterForm.valid){
        console.log(this.surveyFilterForm.value);
        let surveyFilterModel = Object.assign({},this.surveyFilterForm.value);
        console.log(surveyFilterModel)
        this.statisticsService.updateSurveyFilter(surveyFilterModel).subscribe(response=>{this.toastrService.info(response.message,"filtre güncellendi");
        console.log(surveyFilterModel)
        this.surveyFilter=surveyFilterModel;
        },
        responseError=>{this.toastrService.error(responseError.error)})
      }
  }
  getAllUsersWhoSolvedSurveysBySurveyId(surveyId:string){
    this.statisticsService.getAllUsersWhoSolvedSurveysBySurveyId(surveyId).subscribe(response=>{
      if(response.success){
        this.users = response.data;
      }
      else{
      this.toastrService.error(response.message);
      }
    }
    );
  }
  getSurveyFilterBySurveyId(surveyId:string){
    this.statisticsService.getSurveyFilterBySurveyId(surveyId).subscribe(response=>{
      if(response.success){
        this.surveyFilter = response.data;
      }
      else{
      this.toastrService.error(response.message);
      }
    }
    );
  }
  getAllSolvedSurveyBySurveyId(surveyId:string){
    this.statisticsService.getAllSolvedSurveyBySurveyId(surveyId).subscribe(response=>{
      if(response.success){
        this.solvedSurveys = response.data;
      }
      else{
      this.toastrService.error(response.message);
      }
    }
    );
  }
  getAllSurveyByOwnerUserId(){
    this.surveyService.getAllSurveyByOwnerUserId().subscribe(response=>{
      if(response.success){
        this.surveys = response.data;
      }
      else{
      this.toastrService.error(response.message);
      }
    }
    );
  }
  
}
