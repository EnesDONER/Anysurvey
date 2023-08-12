import { ContactService } from './../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm:FormGroup;
  sending = false;
  constructor(private contactService:ContactService, private formBuilder:FormBuilder, private toastrService :ToastrService){

  }
  ngOnInit(){
    this.createContactForm();
  }
  createContactForm(){ 
    this.contactForm = this.formBuilder.group({
      name :['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      recaptcha: [null, Validators.required],
    });
  }
  sendMail(){
    
    if(this.contactForm.valid){
      this.sending = true;
      console.log(this.contactForm.value);
      let contactModel = Object.assign({},this.contactForm.value);
    
      this.contactService.sendMail(contactModel).subscribe(response=>{
        setTimeout(() => {
          this.sending = false;
      }, 1000);
      this.toastrService.success(response.message);
      },
      responseError=>{this.toastrService.error(responseError.error)})
    }
  }

}
