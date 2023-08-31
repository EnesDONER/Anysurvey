import { AuthService } from './../../services/auth.service';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent{
 
  registerForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private toastrService:ToastrService){ 
  }
  ngOnInit(){
    this.createPartnershipForm();
  }
  createPartnershipForm(){ 
    this.registerForm = this.formBuilder.group({
      firstName :['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: [null, Validators.required]
    });
  }
  registerPartnership(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.router.navigateByUrl("/login");
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.registerPartnership(registerModel).subscribe(response=>{this.toastrService.info(response.message)},
      responseError=>{this.toastrService.error(responseError.error)})
    }
  }
}
