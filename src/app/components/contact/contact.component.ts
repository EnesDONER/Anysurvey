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

  constructor(private formBuilder:FormBuilder, private toastrService :ToastrService){

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
}
