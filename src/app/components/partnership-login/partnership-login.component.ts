import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-partnership-login',
  templateUrl: './partnership-login.component.html',
  styleUrls: ['./partnership-login.component.css']
})
export class PartnershipLoginComponent {
  
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
     private authService:AuthService,
     private toastrService:ToastrService,
     private router: Router) {}

  ngOnInit() {
    this.createLoginForm();
  }
  get recaptchaControl() {
    return this.loginForm.get('recaptcha');
  }
  createLoginForm(){ 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: [null, Validators.required],
    });
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value);
    
      this.authService.loginPartenship(loginModel).subscribe(response=>{this.toastrService.info(response.message,"Giriş yapıldı") 
        console.log(response.data)
        localStorage.setItem("token",response.data.token),
        localStorage.setItem("auth","partnership"),
        this.router.navigateByUrl("/");
      },
      responseError=>{this.toastrService.error(responseError.error)})
    }
  }
}
