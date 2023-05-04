import { Component, OnChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent {
  data:string="";
  autoplay:number=1;
  isVideoOpen:boolean= false;
  constructor(private dataService:DataService,private toastrService:ToastrService) {this.data=dataService.data}

  stopVideo(): void {
    const iframe = document.querySelector('#videoModal iframe') as HTMLIFrameElement;
    iframe.src = '';
    this.data=iframe.src;
  }
  onModalHidden() {
    
  }

  // openModal() {
  //   console.time('openModal');
  //   this.modalRef = this.modalService.open(WatchAdsComponent, {
  //     modalClass: 'modal-dialog-centered'
  //   })

  // }

}
