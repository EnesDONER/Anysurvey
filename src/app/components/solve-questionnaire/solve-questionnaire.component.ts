import { ToastrService } from 'ngx-toastr';
import { DataService } from './../../services/data.service';
import {  AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-solve-questionnaire',
  templateUrl: './solve-questionnaire.component.html',
  styleUrls: ['./solve-questionnaire.component.css']
})
export default class SolveQuestionnaireComponent implements OnInit,AfterViewInit, OnDestroy {
  data:string;
  private startedTime: number;
  time:number;
  constructor(private dataService:DataService,private toastrService:ToastrService){this.time=dataService.watchedTime}
  ngOnInit(): void {
    this.data = 'https://www.youtube.com/embed/'+this.dataService.data;
    console.log(this.data);

  }
  ngAfterViewInit() {
    this.startedTime = performance.now(); // bileşen ekranda görüntülenmeye başladığında başlangıç zamanını kaydedin
  }

  ngOnDestroy() {
    const finishedTime = performance.now(); // bileşen ekrandan kaldırıldığında bitiş zamanını kaydedin
    this.time= finishedTime - this.startedTime; // iki zaman damgası arasındaki farkı hesaplayın
    console.log(`MyComponentComponent bileşeninin ekranda görüntülenme süresi: ${this.time} milisaniye`);
    this.dataService.watchedTime =this.time;
    if(this.time>100){
      this.Payment();
    }
  }
  Payment(){
    console.log("odeme yapildi.")
  }
}
