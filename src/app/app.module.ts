import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ToastrModule } from 'ngx-toastr';
import {SolveQuestionnaireComponent} from './components/solve-questionnaire/solve-questionnaire.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { WalletComponent } from './components/wallet/wallet.component';
import { PartnershipComponent } from './components/partnership/partnership.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { ContactComponent } from './components/contact/contact.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AdComponent } from './components/ad/ad.component';
import { VideoIdPipe } from './pipes/video-id.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NaviComponent,
    FooterComponent,
    QuestionnaireComponent,
    SolveQuestionnaireComponent,
    SafePipe,
    WalletComponent,
    PartnershipComponent,
    PaymentComponent,
    LoginComponent,
    RegisterComponent,
    CreateSurveyComponent,
    ContactComponent,
    ForgetPasswordComponent,
    AdComponent,
    VideoIdPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbModalModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
