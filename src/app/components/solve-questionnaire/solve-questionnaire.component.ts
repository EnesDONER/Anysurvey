import { DataService } from './../../services/data.service';
import {  Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-solve-questionnaire',
  templateUrl: './solve-questionnaire.component.html',
  styleUrls: ['./solve-questionnaire.component.css']
})
export default class SolveQuestionnaireComponent implements OnInit {
  // @Input() data:string="";
  data:string="https://www.youtube.com/embed/H5NA_UTSYeE";
  constructor(private dataService:DataService){}
  ngOnInit(): void {
    this.data = 'https://www.youtube.com/embed/'+this.dataService.data;
    console.log(this.data);

  }
}
