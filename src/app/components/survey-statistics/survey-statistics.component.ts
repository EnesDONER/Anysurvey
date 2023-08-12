import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SurveyFilter } from './../../models/surveyFilter';
import { Survey } from './../../models/survey';
import { SolvedSurvey } from './../../models/solvedSurvey';
import { StatisticsService } from './../../services/statistics.service';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/services/survey.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { Chart,registerables } from 'node_modules/chart.js';
import { __param } from 'tslib';
import { ActivatedRoute } from '@angular/router';
import { SurveyStatistic } from 'src/app/models/surveyStatistic';
import * as _ from 'lodash';
Chart.register(...registerables);

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
  surveyDetails: Boolean=false;
  questions:string[]=[];
  maleUsersLenght:number=0;
  femaleUsersLenght:number=0;
  age0_17:number=0;
  age18_30:number=0;
  age31_50:number=0;
  age51_old:number=0;
  statistics:SurveyStatistic[]=[];
  groupedStatistics: { question: string, items: SurveyStatistic[] }[] = [];
  surveyId:string="";

  constructor(private activatedRoute:ActivatedRoute,private surveyService:SurveyService,private formBuilder:FormBuilder,private statisticsService:StatisticsService , private toastrService:ToastrService) {
  }

  ngOnInit() {
    this.createSurveyFilterForm();

    this.activatedRoute.params.subscribe(params => {
      if (params["surveyId"]) {
        this.getAllSolvedSurveyBySurveyId(params["surveyId"]);
        this.getAllUsersWhoSolvedSurveysBySurveyId(params["surveyId"]);
        this.surveyId=params["surveyId"];
        this.getAllStatistics(params["surveyId"]);
        this.getSurveyFilterBySurveyId(params["surveyId"]);
        this.surveyDetails = true;
      } else { 
        this.surveyDetails = false;
        this.getAllSurveyByOwnerUserId();

      }
    });
  }
  groupStatistics() {
    this.groupedStatistics = _.chain(this.statistics)
      .groupBy('question') // Group by 'question' property
      .map((items, question) => ({ question, items }))
      .value();
  }
  getAllStatistics(surveyId:string){
    this.statisticsService.getAllSurveyStatistics(surveyId).subscribe(respponse=>{
      if(respponse.success){
        this.statistics = respponse.data;
        this.groupStatistics();
      }else{
        this.toastrService.error("error");
      }
    },respponseError=>{
        this. toastrService.error(respponseError.error);
    }
    )
  }
  


  renderChart() {
    if(this.surveyDetails){

      this.maleUsersLenght = this.users.filter(user => user.gender === 'Man').length;
      this.femaleUsersLenght = this.users.filter(user => user.gender === 'Women').length;
      this.age0_17 = this.users.filter(user=>user.age<18).length;
      this.age18_30 = this.users.filter(user=>user.age>=18 && user.age<31).length;
      this.age31_50 = this.users.filter(user=>user.age>=31 && user.age<51).length;
      this.age51_old = this.users.filter(user=>user.age>=51).length;
    
    new Chart("genderChart", {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          label: 'User',
          data: [this.maleUsersLenght,this.femaleUsersLenght],
          backgroundColor: ['blue', 'pink'],
        }],
      },
      options: {
        color: 'black',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    new Chart("ageChart", {
      type: 'doughnut',
      data: {
        labels: ['18 younger', '18-30 age old', '31-50 age old','51 older'],
        datasets: [{
          label: 'User',
          data: [this.age0_17, this.age18_30, this.age31_50,this.age51_old],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)','rgb(205, 129, 172)'],
        }],
      },
      options: {
        color: 'black',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    }
  }

  createSurveyFilterForm() {
    this.surveyFilterForm = this.formBuilder.group({
      surveyId: ["", Validators.required],
      minAge: [null, Validators.pattern(/^[0-9]*$/)],
      maxAge: [null, Validators.pattern(/^[0-9]*$/)],
      genderId: null
    });
  }
  updateSurveyFilter(){
      this.surveyFilterForm.get('surveyId').setValue(this.surveyId,undefined)
      
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
        this.renderChart();

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
