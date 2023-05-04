import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements DoCheck{

  @Input() fee:number;

  ngDoCheck(){
    if(this.ncard)
      document.getElementById('card_number').innerHTML=this.ncard;
    if(this.namecard)
      document.getElementById('fullname').innerHTML=this.namecard;
    if(this.date)
      document.getElementById('date').innerHTML=this.date;
  }
  ncard:string;
  namecard:string;
  ccv:string;
  date:string;
  cardNumber(){
   
    if(this.namecard[0]=='4'){
      document.getElementById('card').style.backgroundImage=('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png";"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png');
    }
  }
}
