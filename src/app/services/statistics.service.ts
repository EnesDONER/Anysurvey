import { Survey } from './../models/survey';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { WatchedAd } from '../models/watchedAd';
import { User} from '../models/user';
import { LoginModel } from '../models/loginModel';
import { AdFilter } from '../models/adFilter';
import { SingleResponseModel } from '../models/singleResponseModel';
import { SurveyFilter } from '../models/surveyFilter';
import { SolvedSurvey } from '../models/solvedSurvey';

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
  getAllUsersWhoSolvedSurveysBySurveyId(id:string):Observable<ListResponseModel<User>>{
    let newPath =this.apiUrl + "statistics/getalluserswhosolvedsurveysbysurveyid?id="+id;
    return this.httpClient
      .get<ListResponseModel<User>>(newPath);
  }
  addSolvedSurvey(solvedSurvey:SolvedSurvey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"statistics/addsolvedsurvey",solvedSurvey)
  }
  
  updateSurveyFilter(surveyFilter:SurveyFilter):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"filter/updatesurveyfilter",surveyFilter)
  }
  getSurveyFilterBySurveyId(surveyId:string):Observable<SingleResponseModel<SurveyFilter>>{
    return this.httpClient.get<SingleResponseModel<SurveyFilter>>(this.apiUrl+"filter/getsurveyfilterbysurveyid?surveyId="+surveyId)
  }

  getAllUsersWhoWatchedAdsByAdId(id:string):Observable<ListResponseModel<User>>{
    let newPath =this.apiUrl + "statistics/getalluserswhowatchedadsbyadid?id="+id;
    return this.httpClient
      .get<ListResponseModel<User>>(newPath);
  }
  addWatchedAd(adId:string):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"statistics/addwatchedad?adId="+adId,adId)
  }
  // addAdFilter(adFilter:AdFilter):Observable<ResponseModel>{
  //   return this.httpClient.post<ResponseModel>(this.apiUrl+"filter/addadfilter",adFilter)
  // }
  updateAdFilter(adFilter:AdFilter):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"filter/updateadfilter",adFilter)
  }
  getAdFilterByAdId(adId:string):Observable<SingleResponseModel<AdFilter>>{
    return this.httpClient.get<SingleResponseModel<AdFilter>>(this.apiUrl+"filter/getadfilterbyadid?adId="+adId)
  }
}
