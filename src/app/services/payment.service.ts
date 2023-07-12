import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:7162/api/"

  constructor(private httpClient:HttpClient ) { }

  getAllCard():Observable<ListResponseModel<Card>>{
    let newPath =this.apiUrl + "payment/getallcardbyuserid";
    return this.httpClient
      .get<ListResponseModel<Card>>(newPath);
  }
  payment(cardId:number,amount:number):Observable<ListResponseModel<Card>>{
    let newPath =this.apiUrl + "payment/payment?cardid="+ cardId +"&amount="+amount;
    return this.httpClient
      .get<ListResponseModel<Card>>(newPath);
  }
  addCard(card:Card):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"payment/addcard",card)
  }
}
