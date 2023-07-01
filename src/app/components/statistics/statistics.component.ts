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
  
  constructor(private statisticsService :StatisticsService, private toastrService:ToastrService, private adService:AdService ){
  }
  ngOnInit(){
    this.getAllAdByOwnerUserId();
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
