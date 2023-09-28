import { AnySurveyToken } from './../../models/anySurveyToken';
import { PaymentService } from './../../services/payment.service';
import { WatchedAd } from './../../models/watchedAd';
import { StatisticsService } from './../../services/statistics.service';
import { Ad } from './../../models/ad';
import { AdService } from './../../services/ad.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
declare var bootstrap: any; 

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent {
  user:User;
  tip:string="";
  userWalletAddress:string;
  videoId:string="";
  videoId2:string= "https://anysurvey.blob.core.windows.net/test/14-cart-summary.component.ts - RentACar - Visual Studio Code 2023-05-21 21-42-32.mp4";
  currentAdId:string="";
  startedTime:number;
  watchedTime:number=3000;
  ads:Ad[]= [];


  dataLoaded:boolean=false;
  constructor(private toastrService:ToastrService,private adService:AdService, 
    private statisticsService : StatisticsService, private authService : AuthService,
    private paymentService : PaymentService, private sweetAlertService: SweetAlertService) {}
  ngOnInit(){
    this.getAllUnWatchedAd();
    const userId = this.findAuthenticatedUser();
    this.getUserById(userId);
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
  setCurrentAd(ad: Ad) {
    if (ad.videoURL.includes("youtube")){
      this.currentAdId = "";
      const videoIdPattern = /(?<=v=|v\/|vi=|vi\/|youtu.be\/|\/v\/|embed\/|\/\d+\/|\/\d+\?v=|&v=|embed\/|youtu.be\/|\/v\/|e\/|watch\?v=|&v=|\/\w{11})([\w-]+)/;
      const videoIdMatch = ad.videoURL.match(videoIdPattern);
    
      if (videoIdMatch) {
        debugger
        //this.videoId = "https://www.youtube.com/embed/" + videoIdMatch[0] + "?autoplay=1 | safe"
        //this.videoId= `https://www.youtube.com/embed/${videoIdMatch[0]}?autoplay=1`;
        this.videoId = videoIdMatch[0];
        this.tip= "youtube";
        if (this.videoId) {
          var videoModalElement = document.getElementById('videoModal');
          if (videoModalElement) {
            
            var payModal = new bootstrap.Modal(videoModalElement);
            payModal.show();

            this.currentAdId = ad.id;
          } else {
            this.toastrService.error("Video modal element not found");
          }
        } else {
          this.toastrService.error("Video ID not found");
        }
      }
    }
    

      else{
        debugger
        //this.videoId = ad.videoURL;
        this.tip="other";
        this.videoId = encodeURIComponent(ad.videoURL);

        console.log(this.videoId);

        if (this.videoId) {
          var videoModalElement = document.getElementById('videoModal');
          if (videoModalElement) {
            var payModal = new bootstrap.Modal(videoModalElement);
   
            payModal.show();
      
            this.currentAdId = ad.id;
          } else {
            this.toastrService.error("Video modal element not found");
          }
        } else {
          this.toastrService.error("Video ID not found");
        }
      }
    }


  stopVideo(): void {
    const iframe = document.querySelector('#videoModal iframe') as HTMLIFrameElement;
   
    if(this.tip =="youtube"){
      iframe.src = '';
      this.videoId=iframe.src;

    }

    const finishedTime = performance.now(); // bileşen ekrandan kaldırıldığında bitiş zamanını kaydedin
    const time= finishedTime - this.startedTime; // iki zaman damgası arasındaki farkı hesaplayın
    console.log(`MyComponentComponent bileşeninin ekranda görüntülenme süresi: ${time} milisaniye`);

    if(time >= this.watchedTime){
      this.addWatchedAd(this.currentAdId);
      const indexToDelete = this.ads.findIndex(item => item.id === this.currentAdId);
      this.ads.splice(indexToDelete,1);
      this.currentAdId="";
      this.payment();
      //setTimeout(() => window.location.reload(), 700)
    
    }
    else(
      this.toastrService.error("Ödül Verilmedi.")
    ) 
    this.videoId="";
  }
  startTimer(){
    this.startedTime = performance.now();
  }

  findAuthenticatedUser(): number {
    return this.authService.findAuthenticatedUser();
  }
  getUserById(id:number){
    this.authService.getuserbyid(id).subscribe(response=>{
      if(response.success){
        this.user = response.data;
      }
    })
  }
 
  async payment(){ 
    if (this.user.astWalletAddress==null || this.user.astWalletAddress=="")  {
      const userInput = await this.sweetAlertService.showInputPrompt('Wallet Addres', 'Enter your wallet address:');
      if (userInput) {
        this.user.astWalletAddress = userInput;
        this.authService.updateUser(this.user).subscribe(
          response=>{
            this.toastrService.success(response.message);
          }
        );


      } else {
        return; // İptal edilirse işlemi sonlandırabilirsiniz
      }
    }

    if (this.setCurrentAd){

      const senderToken : AnySurveyToken = {
        amount: "4",
        receiverAddress : this.user.astWalletAddress.toString()
      } 
    this.paymentService.adminTransfer(JSON.stringify(senderToken)).subscribe();
      this.toastrService.success("Payment success");
    }
      
  }
  addWatchedAd(adId:string){
    let watchedAd :WatchedAd={
      id:"",
      adId: adId,
      userId: this.authService.findAuthenticatedUser()
    };
    this.statisticsService.addWatchedAd(watchedAd).subscribe(response=>{
      if(!response.success){
        this.toastrService.error(response.message)
      }
    });
  }
}
