import { AdService } from './../../services/ad.service';

import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any; 


@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent{
  adForm:FormGroup;
  isItPaid:boolean;
  constructor(private formBuilder:FormBuilder,private adService:AdService ,private toastrService:ToastrService) {}
  ngOnInit(){
    this.createAdForm();
  }
  receiveData(data: boolean) {
    this.isItPaid = data;
    console.log(this.isItPaid)
    if(this.isItPaid){
      this.addAd();
      data=false;
    }
  }
  createAdForm(){ 
    this.adForm = this.formBuilder.group({
      description :['', Validators.required],
      companyName: ['', Validators.required],
      videoURL: ['', [Validators.required]],
    });
  }
  checkIfSurveyNull(){
    if(this.adForm.valid){
      var payModal = new bootstrap.Modal(document.getElementById('payModal'));
      payModal.show();
      return true;
    }
    //this.fee= this.survey.questions.length *10;
    
    return false;

  }
  addAd(){
    if(this.checkIfSurveyNull){
      console.log(this.adForm.value);

      let adModel = Object.assign({},this.adForm.value);
      this.adService.add(adModel).subscribe(response=>{this.toastrService.info(response.message)},
      responseError=>{this.toastrService.error(responseError.error);
        console.log(responseError.error)} 
      )
    }
  }
  
}
