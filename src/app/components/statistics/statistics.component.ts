import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { ToastrService } from 'ngx-toastr';
import { WatchedAd } from './../../models/watchedAd';
import { StatisticsService } from './../../services/statistics.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { Ad } from 'src/app/models/ad';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  watchedAds: WatchedAd[]=[];
  ads: Ad[]=[];
  users : User[]=[];
  flippedCards: boolean[] = [];
  adFilterForm:FormGroup;
  constructor(private statisticsService :StatisticsService, private toastrService:ToastrService, private formBuilder:FormBuilder, private adService:AdService ){
  }
  ngOnInit(){
    this.createAdFilterForm();
    this.getAllAdByOwnerUserId();
  }
  createAdFilterForm() {
    this.adFilterForm = this.formBuilder.group({
      adId: ["", Validators.required],
      minAge: [null, Validators.pattern(/^[0-9]*$/)],
      maxAge: [null, Validators.pattern(/^[0-9]*$/)],
      genderId: null
    });
  }
  
  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
    this.getAllUsersWhoWatchedAdsByAdId(this.ads[index].id);
  }
  getAllAdByOwnerUserId(){
    this.adService.getAllAdByOwnerUserId().subscribe(response=>{
      if(response.success){
        this.ads = response.data;
      }
      else{
      this.toastrService.error(response.message);
      }
    }
    );
  }
  addAdFilter(adId:string){
    this.adFilterForm.get('adId').setValue(adId,undefined)
    if(this.adFilterForm.valid){
      console.log(this.adFilterForm.value);
      let adFilterModel = Object.assign({},this.adFilterForm.value);
      console.log(adFilterModel)
      this.statisticsService.addAdFilter(adFilterModel).subscribe(response=>{this.toastrService.info(response.message,"filtre eklendi");
      console.log(adFilterModel)
      },
      responseError=>{this.toastrService.error(responseError.error)})
    }
    
  }
  setCurrentAd(ad:Ad):string{
    const videoIdPattern = /(?<=v=|v\/|vi=|vi\/|youtu.be\/|\/v\/|embed\/|\/\d+\/|\/\d+\?v=|&v=|embed\/|youtu.be\/|\/v\/|e\/|watch\?v=|&v=|\/\w{11})([\w-]+)/;
    const videoIdMatch = ad.videoURL.match(videoIdPattern);
    
    if (videoIdMatch) {
      return videoIdMatch[0];
    } else {
      return "";
    }
  }
  getAllUsersWhoWatchedAdsByAdId(adId:string){
    this.statisticsService.getAllUsersWhoWatchedAdsByAdId(adId).subscribe(response=>{
      if(response.success){
        this.users=response.data;
      }
      else{
        this.toastrService.error(response.message);
      }
    })
  }
}
