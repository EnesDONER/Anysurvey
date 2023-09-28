import { Route, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private toastrService:ToastrService){ 
  }
  ngOnInit(){
    this.createRegisterForm();
  }
  createRegisterForm(){ 
    this.registerForm = this.formBuilder.group({
      firstName :['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDay: [Date, Validators.required],
      genderId: [0, Validators.required],
      recaptcha: [null, Validators.required]
    });
  }
  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);

      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{this.toastrService.info(response.message);
        this.router.navigateByUrl("/login");
      },
      responseError=>{this.toastrService.error(responseError.error)})
    }
  }
}
