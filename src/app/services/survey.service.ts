import { AuthService } from './auth.service';
import { Survey } from './../models/survey';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  apiUrl="https://localhost:44347/api/"

  constructor(private httpClient:HttpClient ) { }
  
  getProducts():Observable<ListResponseModel<Survey>>{
    let newPath =this.apiUrl + "products/getall";
    return this.httpClient
      .get<ListResponseModel<Survey>>(newPath);
  }
  add(product:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"survey/add",product)
  }
  remove(product:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"surevey/remove",product)
  }
  update(product:Survey):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"survey/update",product)
  }
}
