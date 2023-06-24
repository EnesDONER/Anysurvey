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
  startedTime:number;
  watchedTime:number=3000;
  ads:Ad[]= [];
  constructor(private toastrService:ToastrService,private adService:AdService) {}
  ngOnInit(){
    this.getAll();
  }
  getAll(){
    this.adService.getAll().subscribe
    (response=>{this.ads = response.data
    },
    responseError=>{this.toastrService.error(responseError.error)})

  }
  setVideoURL(url:string){
    const videoIdPattern = /(?<=v=|v\/|vi=|vi\/|youtu.be\/|\/v\/|embed\/|\/\d+\/|\/\d+\?v=|&v=|embed\/|youtu.be\/|\/v\/|e\/|watch\?v=|&v=|\/\w{11})([\w-]+)/;
    const videoIdMatch = url.match(videoIdPattern);

    if (videoIdMatch) {
      this.videoId = videoIdMatch[0];
      var payModal = new bootstrap.Modal(document.getElementById('videoModal'));
      payModal.show();
    } else {
      this.toastrService.error("hata")
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
      this.payment();
    }
    else(
      this.toastrService.error("Ödül Verilmedi.")
    ) 
  }
  startTimer(){
    this.startedTime = performance.now();
  }
  payment(){
    //ödeme işlemleri
    //başarılı olursa
    if (this.setVideoURL)
      this.toastrService.success("Ödül Verildi.");
  }
}
