import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  data:string="";
  watchedTime:number=0;
  isWatchedVideo:boolean;
}
