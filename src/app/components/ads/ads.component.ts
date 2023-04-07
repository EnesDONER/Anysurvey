import { WatchAdsComponent } from './../watch-ads/watch-ads.component';
import { Component, OnChanges } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnChanges{
  modalRef: MdbModalRef<WatchAdsComponent> | null = null;
  data:string="";
  constructor(private modalService: MdbModalService,private dataService:DataService,private toastrService:ToastrService) {this.data=dataService.data}
  ngDoCheck(): void {
    if( this.dataService.isWatchedVideo==true){
      this.toastrService.success("odul alindi");
      this.dataService.isWatchedVideo=false;
    }
  }
  ngAfterContentInit(): void {
    if( this.dataService.isWatchedVideo==true){
      console.log("sand")
    }
  
  }
  ngOnChanges():void{
   
   
  }

  openModal() {
    console.time('openModal');
    this.modalRef = this.modalService.open(WatchAdsComponent, {
      modalClass: 'modal-dialog-centered'
    })

  }

  sendData(data:string){
    console.log("send");
    this.data=data;
    this.dataService.data= this.data;
  }
}
