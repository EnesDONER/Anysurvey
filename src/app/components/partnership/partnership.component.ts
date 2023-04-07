import { Component } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { DataService } from 'src/app/services/data.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent {
  modalRef: MdbModalRef<PaymentComponent> | null = null;
  constructor(private modalService: MdbModalService,private dataService:DataService,private toastrService:ToastrService) {}
  openModal() {
    console.time('openModal');
    this.modalRef = this.modalService.open(PaymentComponent, {
      modalClass: 'modal-dialog-centered '
    })

  }
}
