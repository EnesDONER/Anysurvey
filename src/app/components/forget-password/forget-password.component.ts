import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPassword } from 'src/app/models/resetPassword';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetPasswordForm:FormGroup;
  resetToken:string="";
  isResetLinkClicked:boolean=false;
  newPassword:string;
  email:string="";
  constructor(private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute, private router:Router, private authService:AuthService,private toastrService:ToastrService){
  }
  ngOnInit(){
    this.createLoginForm();
    this.activatedRoute.params.subscribe(params => {
      if (params['resetToken']) {
        this.isResetLinkClicked =true;
        this.resetToken=params['resetToken'];
      }
    });
  }

  createLoginForm(){ 
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      recaptcha: [null, Validators.required],
    });
  }
  resetPassword(){
    const resetPasswordModel: ResetPassword = {
      password: this.newPassword,
      resetToken: this.resetToken,
      email: this.email
    };
    
    console.log(this.resetPassword)

    this.authService.resetPassword(resetPasswordModel).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message,"Password changed");
        this.router.navigateByUrl("/login");
      }
      else{
        this.toastrService.error(response.message);
      }
    })
  }
  sendResetPasswordMail(){
    if(this.forgetPasswordForm.valid){
      let email = this.forgetPasswordForm.get("email").value;
      this.authService.sendResetPasswordMail(email).subscribe(response=>{
        if(response.success)
          this.toastrService.info("check your mail box");
      })
    }
    else{
      this.toastrService.error("Invalid form")
    }
  }
}
