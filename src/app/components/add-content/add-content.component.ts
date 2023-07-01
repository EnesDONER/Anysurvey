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
