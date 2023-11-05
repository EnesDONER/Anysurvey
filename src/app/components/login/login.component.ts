import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{this.toastrService.info(response.message,"Login success") 
        localStorage.setItem("token",response.data.token),
        this.router.navigateByUrl("/").then(() => {
          window.location.reload(); // Sayfayı yenile
        });
        
      },
      responseError=>{this.toastrService.error(responseError.error)})
    }
  }
}
