import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { File } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  apiUrl="https://localhost:7162/api/"

  constructor(private httpClient:HttpClient , private authService:AuthService) { }
  
  add(ad:Ad):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"content/addad",ad)
  }
  addAdAndUpload(ad: Ad, containerName: string, formFile: any): Observable<any> {
    // FormData oluşturun
    const formData = new FormData();
    formData.append('CompanyName',ad.companyName); 
    formData.append('Description', ad.description);
    formData.append('OwnerUserId',ad.ownerUserId.toString());
    formData.append('ContainerName', containerName);
    formData.append('FormFile', formFile, formFile.name); // Dosya adını ekleyin
  
    // HTTP başlıklarını ayarlayın
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });
  
    // API isteğini gönderin
    return this.httpClient.post(this.apiUrl + "content/addadandupload", formData, { headers });
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
