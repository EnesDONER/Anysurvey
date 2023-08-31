import { Option } from './../../models/option';
import { QuestionAnswer } from './../../models/questionAnswer';
import { SolvedSurvey } from './../../models/solvedSurvey';
import { StatisticsService } from './../../services/statistics.service';
import { Question } from './../../models/question';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/services/survey.service';
import { Component} from '@angular/core';
import { Survey } from 'src/app/models/survey';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-solve-questionnaire',
  templateUrl: './solve-questionnaire.component.html',
  styleUrls: ['./solve-questionnaire.component.css']
})
export class SolveQuestionnaireComponent  {
  
  currentIndex=0;
  answer:string="";
  survey :Survey={
    id:"",
    ownerUserId:0,
    description:"",
    title:"",
    questions:[]
  };
  
  solvedSurvey :SolvedSurvey={
    surveyId:"",
    userId:0,
    questionsAnswers:[]
  };
  questionsAnswers:QuestionAnswer[] = [{
    questionDescription:"",
    selectedAnswers:[]
  }]
  selectedItems: number[] = [];

  constructor(private activatedRoute:ActivatedRoute, private authService:AuthService,
     private router:Router, private statisticsService:StatisticsService, 
     private surveyService:SurveyService,private toastrService:ToastrService){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['surveyId']) {
        this.getSurveyById(params['surveyId']);
      }
    });
  }
  isSelected(index: number): boolean {
    return this.selectedItems.includes(index);
  }

  toggleSelected(index: number) {
    const selectedIndex = this.selectedItems.indexOf(index);
    if (selectedIndex > -1) {
      this.selectedItems.splice(selectedIndex, 1);
    } else {
      this.selectedItems.push(index);
    }
  }
  setClassicQuestionAnswer(question:Question){
    debugger
    if(this.answer!=""){
      let questionAnswer: QuestionAnswer = {
        questionDescription: question.description,
        ////HATA
        selectedAnswers: [{ selectedOptionDescription: this.answer.toString() }]
      };
      this.solvedSurvey.questionsAnswers.push(questionAnswer);
    }
    this.answer="";
  }
  setQuestionAnswer(question:Question,option:Option){
    //soru yoksa cevabı soruyla birlikte ekle
    if(!this.solvedSurvey.questionsAnswers.some(item => item.questionDescription === question.description)){
      let questionAnswer: QuestionAnswer = {
        questionDescription: question.description,
        selectedAnswers: [{ selectedOptionDescription: option.description }]
      };
      this.solvedSurvey.questionsAnswers.push(questionAnswer);
    } 
    //soru varsa o soruya cevabı yükle
    else{
      const questionIndex=  this.solvedSurvey.questionsAnswers.findIndex(q => (q.questionDescription===question.description));
      const optionIndex=  this.solvedSurvey.questionsAnswers[questionIndex].selectedAnswers.findIndex(o => (o.selectedOptionDescription===option.description));
      //bu cevap zaten varsa sil
      if(optionIndex != -1){
        this.solvedSurvey.questionsAnswers[questionIndex].selectedAnswers.splice(optionIndex, 1);
      }
      //cevap yoksa ekle
      else{
      this.solvedSurvey.questionsAnswers[questionIndex].selectedAnswers.push({selectedOptionDescription : option.description});
      }
    }
  }

  printSolvedSurvey(){
    console.log(this.solvedSurvey)
  }
  
  addSolvedSurvey(){
    this.solvedSurvey.surveyId = this.survey.id;
    this.solvedSurvey.userId = this.authService.findAuthenticatedUser();
    let solvedSurveyModel = Object.assign({},this.solvedSurvey)

    this.statisticsService.addSolvedSurvey(solvedSurveyModel).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message,"Your answer has been received");
        this.router.navigateByUrl("/questionnaire");

      }
      else{
        this.toastrService.error(response.message);
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
    this.selectedItems.splice(0, this.selectedItems.length);
  }
}
