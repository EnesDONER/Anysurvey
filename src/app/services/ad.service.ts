import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  apiUrl="https://localhost:7162/api/"

  constructor(private httpClient:HttpClient , private authService:AuthService) { }
  
  // getAll():Observable<ListResponseModel<Ad>>{
  //   let newPath =this.apiUrl + "content/getallads";
  //   return this.httpClient
  //     .get<ListResponseModel<Ad>>(newPath);
  // }
  // getById(id:string):Observable<SingleResponseModel<Ad>>{
  //   let newPath =this.apiUrl + "content/getadbyid?id="+id;
  //   return this.httpClient
  //     .get<SingleResponseModel<Ad>>(newPath);
  // }
  add(ad:Ad):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"content/addad",ad)
  }
  getAllAdByOwnerUserId():Observable<ListResponseModel<Ad>>{
    const userId = this.authService.findAuthenticatedUser();

    let newPath =this.apiUrl + "content/getalladsbyowneruserid?userId="+userId;
    return this.httpClient
      .get<ListResponseModel<Ad>>(newPath);
  }
  getAllUnWatchedAd():Observable<ListResponseModel<Ad>>{   
    const userId = this.authService.findAuthenticatedUser();
    
    let newPath =this.apiUrl + "content/getallunwatchedads?userId="+userId;
    return this.httpClient
      .get<ListResponseModel<Ad>>(newPath);
  }

}
