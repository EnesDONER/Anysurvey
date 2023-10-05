import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';

declare var bootstrap: any; 
declare var $ :any;
export enum EnterType {
  Url = 'Url',
  ChooseFile = 'Choose File',
}
@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent {
  EnterType = EnterType;
  adForm:FormGroup;
  isItPaid:boolean=false;
  selectedType = EnterType.Url;
  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  selectedImageFileName:string | undefined;
  selectedImageFile: File | undefined;

  constructor(private formBuilder:FormBuilder,private authService:AuthService, private adService:AdService ,private toastrService:ToastrService) {}
  ngOnInit(){
    this.createAdForm();
  }
  toggleType() {
    this.selectedType =
      this.selectedType === EnterType.Url
        ? EnterType.ChooseFile
        : EnterType.Url;
  }
  receiveData(data: boolean) {
    debugger
    this.isItPaid = data;
    console.log(this.isItPaid)
    if(this.isItPaid){
      debugger
      if(this.selectedType == EnterType.ChooseFile)
        this.addAdandUpload();

      if(this.selectedType == EnterType.Url)
        this.addAd();

    }
    else{
      this.toastrService.error("Payment has not been made")
    }
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = " - "+ this.selectedFile?.name;
    console.log("file selected")
  }
  onImageSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    this.selectedImageFileName = " - "+ this.selectedImageFile?.name;
    console.log("image file selected")
  }

  createAdForm(){ 
    this.adForm = this.formBuilder.group({
      description :['', Validators.required],
      companyName: ['', Validators.required],
      videoURL: [''],
      ownerUserId: [this.authService.findAuthenticatedUser(), [Validators.required]],
      videoImage: ['', Validators.required],
      
    });
  }
  checkIfAdNull(){
    if (!this.selectedImageFile){
      this.toastrService.error("Choose video Image");
      function alert() {
        $("#chooseVideoImage").css("color", "red");
        $("#paperclip").css("fill", "red");
        setTimeout(function() {
          $("#chooseVideoImage").css("color", "black");
          $("#paperclip").css("fill", "blue");

        }, 200); // 200 milisaniye sonra rengi geri çevir
      }
      
      // Döngü ile yanıp sönme işlemini 5 kez çağıralım
      for (let i = 0; i < 5; i++) {
        setTimeout(alert, i * 400); // Her seferinde 400 milisaniye bekleyerek işlemi tekrarla
      }
      return false;
    }

    if(this.adForm.valid){
      var payModal = new bootstrap.Modal(document.getElementById('payModal'));
      payModal.show();
      return true;
    }
    //this.fee= this.survey.questions.length *10;
    
    return false;

  }
  addAd(){
    if( this.selectedType == EnterType.Url && this.checkIfAdNull && this.isItPaid){
      console.log(this.adForm.value);
      this.isItPaid=false;
      let adModel = Object.assign({},this.adForm.value);
      const imageContainerName = "ad-images";
      this.adService.add(adModel,imageContainerName,this.selectedImageFile).subscribe(response=>{this.toastrService.success(response.message,"Ad added");
      this.createAdForm()},
      responseError=>{
        this.toastrService.error(responseError.error,"If you have paid but think the ad has not been added, please contact us.");
      })
    }
  }
  addAdandUpload(){
    console.log(this.selectedType)
    if( this.selectedType == EnterType.ChooseFile && this.isItPaid){
      console.log(this.adForm.value);
      if (!this.selectedFile){
        this.toastrService.error("Choose video")
      }
      console.log(this.selectedFile)
      this.isItPaid=false;
      let adModel = Object.assign({},this.adForm.value);
      const videoContainerName = "ad-videos";
      const videoImageContainerName = "ad-images";
      console.log("uploadd");
      this.adService.addAdAndUpload(adModel, videoContainerName, videoImageContainerName , this.selectedFile,this.selectedImageFile).subscribe(
        response => {
          this.toastrService.success(response.message, "Ad added");
          this.createAdForm();
        },
        error => {
          console.error("An error occurred:", error);
          this.toastrService.error("An error occurred while adding the ad.");
        }
      );

    }
  }
}
