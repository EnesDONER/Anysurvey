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
  
  add(ad:Ad,imageContainerName: string,videoImage: any):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append('CompanyName',ad.companyName); 
    formData.append('Description', ad.description);
    formData.append('OwnerUserId',ad.ownerUserId.toString());
    formData.append('VideoUrl', ad.videoURL);
    formData.append('ImageContainerName', imageContainerName);
    formData.append('VideoImage', videoImage, videoImage.name);
    
    // HTTP başlıklarını ayarlayın
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl+"content/addad",formData, { headers })
  }
  addAdAndUpload(ad: Ad, videoContainerName: string, imageContainerName: string,videoUri: any, videoImage: any): Observable<any> {
    // FormData oluşturun
    const formData = new FormData();
    formData.append('CompanyName',ad.companyName); 
    formData.append('Description', ad.description);
    formData.append('OwnerUserId',ad.ownerUserId.toString());
    formData.append('VideoContainerName', videoContainerName);
    formData.append('ImageContainerName', imageContainerName);
    formData.append('VideoUri', videoUri, videoUri.name); // Dosya adını ekleyin
    formData.append('VideoImage', videoImage, videoImage.name);
    
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
