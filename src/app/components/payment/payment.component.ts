import { Component, DoCheck, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements DoCheck{

  @Input() fee:number;

  ngDoCheck(){
    if(this.ncard)
      document.getElementById('card_number').innerHTML= this.ncard.toString();
      this.backGround();
    if(this.namecard)
      document.getElementById('fullname').innerHTML=this.namecard.toUpperCase();
    if(this.date)
      document.getElementById('date').innerHTML=this.date;
    if(this.cvv)
      document.getElementById('cvv').innerHTML=this.cvv.toString();
  }
  ncard:number;
  namecard:string;
  cvv:number;
  date:string;
  
  
  onCardNumberKeyDown(event: KeyboardEvent,lenght:number) {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    const maxLength = lenght; // Max length that is allowed
    
    if (currentValue.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault(); // Prevent any further input if we reached the limit
    }
  }
  backGround() {
    //ön gözüküyorsa
    if(document.getElementById('back').style.visibility =='hidden'){
      if (this.ncard && this.ncard.toString()[0] == '4') {
        document.getElementById('card').style.backgroundImage = 'url("../../../assets/images/masterCard.png")';
        document.getElementById('card').style.backgroundRepeat = 'no-repeat';
        document.getElementById('card').style.backgroundSize = 'cover';
        document.getElementById('front').style.color = 'black';
      }
      else if (this.ncard && this.ncard.toString()[0] == '5') {
        document.getElementById('card').style.backgroundImage = 'url("../../../assets/images/visaCard.png")';
        document.getElementById('card').style.backgroundRepeat = 'no-repeat';
        document.getElementById('card').style.backgroundSize = 'cover';
        document.getElementById('front').style.color = 'orange';
      }
      else if (!this.ncard){
        document.getElementById('card').style.backgroundColor = 'lightgray';
        document.getElementById('card').style.backgroundImage = '';
        document.getElementById('front').style.color = 'orange';
      }
    }
    //arkası gözüküyorsa
    else if(document.getElementById('back').style.visibility =='visible'){
      if (this.ncard && this.ncard.toString()[0] == '4') {
        document.getElementById('card').style.backgroundImage = '';
        document.getElementById('card').style.backgroundColor = 'gold';
      }
      if (this.ncard && this.ncard.toString()[0] == '5') {
        document.getElementById('card').style.backgroundImage = '';
        document.getElementById('card').style.backgroundColor = 'darkblue';
      }
    }
  }
  turn(){
    if( document.getElementById('back').style.visibility =='hidden'){
      document.getElementById('back').style.visibility = 'visible';
      document.getElementById('front').style.visibility = 'hidden';
      this.backGround();
    } 
    else{ 
      document.getElementById('back').style.visibility = 'hidden';
      document.getElementById('front').style.visibility = 'visible';
      this.backGround()
    }
   
  }
  
}
