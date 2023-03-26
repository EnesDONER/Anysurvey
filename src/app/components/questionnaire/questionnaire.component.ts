import { DataService } from './../../services/data.service';
import SolveQuestionnaireComponent from './../solve-questionnaire/solve-questionnaire.component';
import { Component,  EventEmitter,  Output } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  
  modalRef: MdbModalRef<SolveQuestionnaireComponent> | null = null;
  // data:string="veriler listenen yer";
  // @Output() setDataEvent = new EventEmitter<string>;
  data:string="";
  constructor(private modalService: MdbModalService,private dataService:DataService) {this.data=dataService.data}
  openModal() {
    this.modalRef = this.modalService.open(SolveQuestionnaireComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }
  // setData(){
  //   this.setDataEvent.emit(this.data);
  // }
  sendData(data:string){
    console.log("send");
    this.data=data;
    this.dataService.data= this.data;
  }
}
