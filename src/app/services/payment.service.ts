import { AuthService } from 'src/app/services/auth.service';
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
}
