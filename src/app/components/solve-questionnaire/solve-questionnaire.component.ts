import { Question } from './../../models/question';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/services/survey.service';
import { Component} from '@angular/core';
import { Survey } from 'src/app/models/survey';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solve-questionnaire',
  templateUrl: './solve-questionnaire.component.html',
  styleUrls: ['./solve-questionnaire.component.css']
})
export class SolveQuestionnaireComponent  {
  survey:Survey;
  currentIndex=0;

  constructor(private activatedRoute:ActivatedRoute, private surveyService:SurveyService,private toastrService:ToastrService){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['surveyId']) {
        this.getSurveyById(params['surveyId']);
      }
    });
  }

  getSurveyById(surveyId:string){
    this.surveyService.getById(surveyId).subscribe(
      response=>{
        if(response.success){
          this.survey = response.data;
        }
        else{
          this.toastrService.error(response.message);
        }
    })
  }
  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.survey.questions.length;
  }
}
