import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl="https://localhost:7162/api/"

  constructor(private httpClient:HttpClient ) { }
  sendMail(contact:Contact):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"contact/sendmail",contact)
  }
}
