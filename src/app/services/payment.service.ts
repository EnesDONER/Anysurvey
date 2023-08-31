import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { AnySurveyToken } from '../models/anySurveyToken';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:7162/api/";
  apiUrlNode="http://localhost:8080/";

  constructor(private httpClient:HttpClient , private authService:AuthService) { }

  getAllCard():Observable<ListResponseModel<Card>>{
    const userId = this.authService.findAuthenticatedUser();
    let newPath =this.apiUrl + "payment/getallcardbyuserid?userId="+userId;
    return this.httpClient
      .get<ListResponseModel<Card>>(newPath);
  }
  payment(cardId:number,amount:number):Observable<ListResponseModel<Card>>{
    const userId = this.authService.findAuthenticatedUser();
    let newPath =this.apiUrl + "payment/payment?cardid="+ cardId +"&amount="+amount+"&userId="+userId;
    return this.httpClient
      .get<ListResponseModel<Card>>(newPath);
  }
  addCard(card:Card):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"payment/addcard",card)
  }

  transfer(){
    return this.httpClient
      .get<AnySurveyToken>(this.apiUrl);
  }
  adminTransfer(anySurveyToken:string){
    return this.httpClient.post<AnySurveyToken>(this.apiUrlNode+"admintransfer",JSON.parse(anySurveyToken) )
  }
  // peartoPearTransfer(anySurveyToken:string){
  //   return this.httpClient.post<AnySurveyToken>(this.apiUrlNode+"peartopeartransfer",JSON.parse(anySurveyToken) )
  // }
}
