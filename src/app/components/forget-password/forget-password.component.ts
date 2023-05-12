import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetPasswordForm:FormGroup;
  constructor(private formBuilder:FormBuilder){
  }
  ngOnInit(){
    this.createLoginForm();
  }

  createLoginForm(){ 
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      recaptcha: [null, Validators.required],
    });
  }
  
}
