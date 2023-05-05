import {  ToastrService } from 'ngx-toastr';
import {SolveQuestionnaireComponent} from './../solve-questionnaire/solve-questionnaire.component';
import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit, DoCheck, OnChanges } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  data:string="";
  time:number;
  isWatched:boolean;
  constructor(private toastrService:ToastrService) {}

}
