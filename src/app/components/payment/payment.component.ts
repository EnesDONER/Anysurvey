import { PaymentService } from './../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { AuthService } from 'src/app/services/auth.service';


declare var bootstrap: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements DoCheck{

  @Input() fee:number;
  @Output() dataEvent = new EventEmitter<boolean>();
  isItPaid:boolean = false;
  cards:Card[]=[];
  selectedCardId:number=0;
  ncard:number;
  namecard:string;
  cvv:number;
  date:string;
  cardId:number=0;
  ngOnInit(){
    this.isItPaid=false;
    this.getAllCard();
  }
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
  
  
  constructor(private toastrService:ToastrService, private authService:AuthService,
    private paymentService:PaymentService){

  }
  setDataEvent() {
    var payModal = new bootstrap.Modal(document.getElementById('payModal'));
      payModal.hide();
      this.dataEvent.emit(this.isItPaid);
  }
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
  getAllCard(){
    this.paymentService.getAllCard().subscribe(response=>{
      if(response.success){
        this.cards=response.data;
      }
      else{
        this.toastrService.error("kart yok")
      }
    })
  }
  addCard(){
    let [expireYear, expireMonth] = this.date.split("-");
    const cardModel: Card = {
      id:0,
      userId:this.authService.findAuthenticatedUser(),
      cardNumber : this.ncard.toString(),
      holderName : this.namecard,
      cvc : this.cvv.toString(),
      expireMonth : expireMonth,
      expireYear : expireYear
    };
    this.setCardId(cardModel.id);

    this.paymentService.addCard(cardModel).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message,"Card aded");
        this.toastrService.info(response.message,"Click the payment button again to pay");
        this.ncard=0;
        this.namecard="";
        this.cvv=0;
        this.date=""
       // setTimeout(() => window.location.reload(), 1000)
        }
      else{
        this.toastrService.error(response.message);
      }
      },responseError=>{
        this.toastrService.error(responseError.error);
      })

  }
  setCardId(id:number){
    this.cardId=id;
  }
  payment(){
      this.paymentService.payment(this.cardId ,this.fee).subscribe(response=>{
         if(response.success){
          this.toastrService.success(response.message,"Payment success");
          console.log(response.data);
          this.isItPaid=true;
          this.setDataEvent();

        }
        else{
          this.toastrService.error(response.message,"Payment error");
          this.isItPaid=false;
          this.setDataEvent();

        }
      },responseError=>{
        this.toastrService.error(responseError.error);
        this.isItPaid=false;
        this.setDataEvent();
      }
      )
    }  
   
}
