import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { WatchedAd } from '../models/watchedAd';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

 apiUrl="https://localhost:7162/api/"

  constructor(private httpClient:HttpClient ) { }
  
  // getAllWatchedAd():Observable<ListResponseModel<WatchedAd>>{
  //   let newPath =this.apiUrl + "statistics/getallwatchedad";
  //   return this.httpClient
  //     .get<ListResponseModel<WatchedAd>>(newPath);
  // }
  // getAllByUserIdWatchedAd(userId:number):Observable<ListResponseModel<WatchedAd>>{
  //   let newPath =this.apiUrl + "statistics/getallbyuseridwatchedad?userId"+userId;
  //   return this.httpClient
  //     .get<ListResponseModel<WatchedAd>>(newPath);
  // }
  
  add(adId:string):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"statistics/addwatchedad?adId="+adId,adId)
  }
}
