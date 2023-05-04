import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-watch-ads',
  templateUrl: './watch-ads.component.html',
  styleUrls: ['./watch-ads.component.css']
})
export class WatchAdsComponent {
  data:string;
  private startedTime: number;
  time:number;
  constructor(public modalRef: MdbModalRef<WatchAdsComponent>,private dataService:DataService,private toastrService:ToastrService){this.time=dataService.watchedTime}
  ngOnInit(): void {
    this.data = 'https://www.youtube.com/embed/'+this.dataService.data+'?autoplay=1';
    console.log(this.data);

  }
  ngAfterViewInit() {
    this.startedTime = performance.now(); // bileşen ekranda görüntülenmeye başladığında başlangıç zamanını kaydedin
  }

  ngOnDestroy() {
    const finishedTime = performance.now(); // bileşen ekrandan kaldırıldığında bitiş zamanını kaydedin
    this.time= finishedTime - this.startedTime; // iki zaman damgası arasındaki farkı hesaplayın
    console.log(`MyComponentComponent bileşeninin ekranda görüntülenme süresi: ${this.time} milisaniye`);
    this.dataService.watchedTime =this.time;
    if(this.time>100){
      this.Payment();
    }
  }
  Payment(){
    console.log("odeme yapildi.");
    this.dataService.isWatchedVideo=true;
  }
}
