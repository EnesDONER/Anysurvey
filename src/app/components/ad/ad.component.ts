import { WatchedAd } from './../../models/watchedAd';
import { StatisticsService } from './../../services/statistics.service';
import { Ad } from './../../models/ad';
import { AdService } from './../../services/ad.service';
import { Component, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any; 

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent {
  videoId:string;
  currentAdId:string="";
  startedTime:number;
  watchedTime:number=3000;
  ads:Ad[]= [];
  dataLoaded:boolean=false;
  constructor(private toastrService:ToastrService,private adService:AdService, private statisticsService : StatisticsService) {}
  ngOnInit(){
    this.getAllUnWatchedAd();
  }
  getAllUnWatchedAd(){
    this.adService.getAllUnWatchedAd().subscribe
    (response=>{this.ads = response.data;
      this.dataLoaded=true;
      if(response.data.length==0){
        this.toastrService.error("No watchable ads found.")
      }
    },
    responseError=>{this.toastrService.error(responseError.error)})

  }
  setCurrentAd(ad:Ad){
    const videoIdPattern = /(?<=v=|v\/|vi=|vi\/|youtu.be\/|\/v\/|embed\/|\/\d+\/|\/\d+\?v=|&v=|embed\/|youtu.be\/|\/v\/|e\/|watch\?v=|&v=|\/\w{11})([\w-]+)/;
    const videoIdMatch = ad.videoURL.match(videoIdPattern);

    if (videoIdMatch) {
      this.videoId = videoIdMatch[0];
      var payModal = new bootstrap.Modal(document.getElementById('videoModal'));
      payModal.show();
      this.currentAdId=ad.id;
    } else {
      this.toastrService.error("This video cannot be played")
    }
    
  }

  stopVideo(): void {
    const iframe = document.querySelector('#videoModal iframe') as HTMLIFrameElement;
    iframe.src = '';
    this.videoId=iframe.src;
    const finishedTime = performance.now(); // bileşen ekrandan kaldırıldığında bitiş zamanını kaydedin
    const time= finishedTime - this.startedTime; // iki zaman damgası arasındaki farkı hesaplayın
    console.log(`MyComponentComponent bileşeninin ekranda görüntülenme süresi: ${time} milisaniye`);

    if(time >= this.watchedTime){
      this.addWatchedAd(this.currentAdId);
      this.currentAdId="";
      this.payment();
      //setTimeout(() => window.location.reload(), 700)
      const indexToDelete = this.ads.findIndex(item => item.id === this.currentAdId);
      this.ads.splice(indexToDelete,1);
    }
    else(
      this.toastrService.error("Ödül Verilmedi.")
    ) 
    this.videoId="";
  }
  startTimer(){
    this.startedTime = performance.now();
  }
  payment(){

    if (this.setCurrentAd){
      this.toastrService.success("Ödül Verildi.");
    }
      
  }
  addWatchedAd(adId:string){
    this.statisticsService.addWatchedAd(adId).subscribe(response=>{
      if(!response.success){
        this.toastrService.error(response.message)
      }
    });
  }
}
