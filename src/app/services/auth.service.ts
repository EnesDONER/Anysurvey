import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { ResetPassword } from '../models/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:7162/api/auth/";
  constructor(private httpClient:HttpClient) { }
  
  sendResetPasswordMail(email:string){
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl + "sendresetpasswordmail?email="+email,email);
  }
  resetPassword(resetPassword:ResetPassword){
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl + "resetpassword",resetPassword);
  }
  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login",loginModel);
  }
  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<ResponseModel>>(this.apiUrl + "register",registerModel);
  }
  registerPartnership(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<ResponseModel>>(this.apiUrl + "registerpartnership",registerModel);
  }
  loginPartenship(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "loginpartnership",loginModel);
  }
  isPartnership(){
    if(localStorage.getItem("auth")=="partnership"){
      return true;
    }
    else{
      return false;
    }
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  
  logout(){
    if(this.isAuthenticated){
      localStorage.clear();
    }
  }

}
