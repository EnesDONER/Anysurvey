import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder ){ 
  }
  ngOnInit(){
    this.createLoginForm();
  }
  createLoginForm(){ 
    this.registerForm = this.formBuilder.group({
      firstName :['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: [null, Validators.required],
    });
  }

}
