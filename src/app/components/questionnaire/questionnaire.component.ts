import {  ToastrService } from 'ngx-toastr';
import { DataService } from './../../services/data.service';
import {SolveQuestionnaireComponent} from './../solve-questionnaire/solve-questionnaire.component';
import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit, DoCheck, OnChanges } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit,AfterViewInit,AfterViewChecked,AfterContentChecked,AfterContentInit,DoCheck,OnChanges {

  modalRef: MdbModalRef<SolveQuestionnaireComponent> | null = null;
  data:string="";
  time:number;
  isWatched:boolean;
  constructor(private modalService: MdbModalService,private dataService:DataService,private toastrService:ToastrService) {this.data=dataService.data}
  ngDoCheck(): void {
  
  }
  ngAfterContentInit(): void {

  
  }
  ngOnChanges():void{
    this.isWatched=false;
    this.time=this.dataService.watchedTime;
    console.log(this.time);
    if(this.time>=100){
      console.log("başarılı");
      this.isWatched=true;
      this.time=0;
      this.toastrService.error("ms")
    }
  }
  ngAfterContentChecked(): void {

  }
  ngAfterViewChecked(): void {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

  }
  openModal() {
    console.time('openModal');
    this.modalRef = this.modalService.open(SolveQuestionnaireComponent, {
      modalClass: 'modal-dialog-centered'
    })

  }

  sendData(data:string){
    console.log("send");
    this.data=data;
    this.dataService.data= this.data;
  }
}
