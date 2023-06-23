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

  constructor(private httpClient:HttpClient ) { }
  
  getAll():Observable<ListResponseModel<Survey>>{
    let newPath =this.apiUrl + "survey/getall";
    return this.httpClient
      .get<ListResponseModel<Survey>>(newPath);
  }
  getById(id:string):Observable<SingleResponseModel<Survey>>{
    let newPath =this.apiUrl + "survey/getbyid?id="+id;
    return this.httpClient
      .get<SingleResponseModel<Survey>>(newPath);
  }
  add(survey:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"survey/add",survey)
  }
  remove(survey:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"surevey/remove",survey)
  }
  update(survey:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"survey/update",survey)
  }
}
