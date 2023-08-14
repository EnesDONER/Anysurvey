import { AuthService } from './auth.service';
import { Survey } from './../models/survey';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  apiUrl="https://localhost:7162/api/"

  constructor(private httpClient:HttpClient , private authService:AuthService ) { }
  
  getAll():Observable<ListResponseModel<Survey>>{
    let newPath =this.apiUrl + "content/getallsurveys";
    return this.httpClient
      .get<ListResponseModel<Survey>>(newPath);
  }
  getById(id:string):Observable<SingleResponseModel<Survey>>{
    let newPath =this.apiUrl + "content/getsurveybyid?id="+id;
    return this.httpClient
      .get<SingleResponseModel<Survey>>(newPath);
  }
  getAllSurveyByOwnerUserId():Observable<ListResponseModel<Survey>>{
    const userId = this.authService.findAuthenticatedUser();
    let newPath =this.apiUrl + "content/getallsurveysbyowneruserid?userId="+userId;
    return this.httpClient
      .get<ListResponseModel<Survey>>(newPath);
  }
  getAllUnsolvedSurveys():Observable<ListResponseModel<Survey>>{
    const userId = this.authService.findAuthenticatedUser();

    let newPath =this.apiUrl + "content/getallunsolvedsurveys?userId="+userId;
    return this.httpClient
      .get<ListResponseModel<Survey>>(newPath);
  }
  add(survey:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"content/addsurvey",survey)
  }
  remove(survey:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"content/removesurvey",survey)
  }
  update(survey:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"content/updatesurvey",survey)
  }
}
