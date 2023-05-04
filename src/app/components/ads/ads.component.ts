import { Component, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent {
  data:string="";
  startedTime:number;
  watchedTime:number=3000;
  constructor(private toastrService:ToastrService) {}

  stopVideo(): void {
    const iframe = document.querySelector('#videoModal iframe') as HTMLIFrameElement;
    iframe.src = '';
    this.data=iframe.src;
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
    this.toastrService.success("Ödül Verildi.");
  }
}
