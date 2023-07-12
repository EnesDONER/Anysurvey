import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdService } from 'src/app/services/ad.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent {
  adForm:FormGroup;
  isItPaid:boolean=false;
  constructor(private formBuilder:FormBuilder,private adService:AdService ,private toastrService:ToastrService) {}
  ngOnInit(){
    this.createAdForm();
  }
  receiveData(data: boolean) {
    debugger
    this.isItPaid = data;
    console.log(this.isItPaid)
    if(this.isItPaid){
      this.addAd();
    }
    else{
      this.toastrService.error("Payment has not been made")
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
    if(this.checkIfSurveyNull && this.isItPaid){
      console.log(this.adForm.value);
      this.isItPaid=false;
      let adModel = Object.assign({},this.adForm.value);
      this.adService.add(adModel).subscribe(response=>{this.toastrService.success(response.message,"Ad added")},
      responseError=>{this.toastrService.error(responseError.error);
        this.toastrService.error(responseError.error);
      })
    }
  }
}
