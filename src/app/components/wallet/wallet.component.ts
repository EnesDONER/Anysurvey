import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  transferBalanceForm:FormGroup;
  constructor(private formBuilder:FormBuilder){

  }
  ngOnInit(){
    this.createtransferBalanceForm();
  }
  createtransferBalanceForm(){ 
    this.transferBalanceForm = this.formBuilder.group({
      walletAddress: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }


}
