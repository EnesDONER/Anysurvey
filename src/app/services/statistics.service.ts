import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { WatchedAd } from '../models/watchedAd';
import { User} from '../models/user';
import { LoginModel } from '../models/loginModel';
import { AdFilter } from '../models/adFilter';

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
  
  getAllUsersWhoWatchedAdsByAdId(id:string):Observable<ListResponseModel<User>>{
    let newPath =this.apiUrl + "statistics/getalluserswhowatchedadsbyadid?id="+id;
    return this.httpClient
      .get<ListResponseModel<User>>(newPath);
  }
  addWatchedAd(adId:string):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"statistics/addwatchedad?adId="+adId,adId)
  }
  addAdFilter(adFilter:AdFilter):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"statistics/addadfilter",adFilter)
  }
}
