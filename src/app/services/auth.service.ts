import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { ResetPassword } from '../models/resetPassword';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://webapi20231005142517.azurewebsites.net/api/auth/";
  constructor(private httpClient:HttpClient,private router:Router) { }
  
  sendResetPasswordMail(email:string){
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl + "sendresetpasswordmail?email="+email,email);
  }
  resetPassword(resetPassword:ResetPassword){
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl + "resetpassword",resetPassword);
  }
  updateUser(user:User):Observable<ResponseModel>{
    return this.httpClient.post<SingleResponseModel<ResponseModel>>(this.apiUrl + "updateuser",user);
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
  getuserbyid(id:Number):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "getuserbyid?id="+id);
  }
  
  isPartnership(){
    const token = localStorage.getItem("token");
    let hasPartnershipRole:boolean=false;
    if(token){
      const tokenPayload: any = jwt_decode(token); // Token'ı çöz

      // Kullanıcının rollerini kontrol et
      if (tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
        const userRoles: string[] = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // "partnership" rolünün olup olmadığını kontrol et
        hasPartnershipRole = userRoles.includes('partnership');
      }
    }
    
    if(hasPartnershipRole){
      return true;
    }
    else{
      return false;
    }
  }
  isAuthenticated(){
    const token = localStorage.getItem("token");
    return !!token;
  }
  findAuthenticatedUser(): number {
    const token = localStorage.getItem("token");
    let userId: number = 0;
    if (token) {
      const tokenPayload: any = jwt_decode(token);
      userId = Number(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    }
    return userId;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"])
  }
}
