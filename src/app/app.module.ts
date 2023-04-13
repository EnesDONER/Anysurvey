import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ToastrModule } from 'ngx-toastr';
import {SolveQuestionnaireComponent} from './components/solve-questionnaire/solve-questionnaire.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { AdsComponent } from './components/ads/ads.component';
import { WatchAdsComponent } from './components/watch-ads/watch-ads.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { PartnershipComponent } from './components/partnership/partnership.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NaviComponent,
    FooterComponent,
    QuestionnaireComponent,
    SolveQuestionnaireComponent,
    SafePipe,
    AdsComponent,
    WatchAdsComponent,
    WalletComponent,
    PartnershipComponent,
    PaymentComponent,
    LoginComponent,
    RegisterComponent,
    CreateSurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    FormsModule,
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
