import { PartnershipLoginComponent } from './components/partnership-login/partnership-login.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { AdComponent } from './components/ad/ad.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SolveQuestionnaireComponent} from './components/solve-questionnaire/solve-questionnaire.component';
import { PartnershipComponent } from './components/partnership/partnership.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginGuard } from './guards/login.guard';
import { AddContentComponent } from './components/add-content/add-content.component';
import { AdStatisticsComponent } from './components/ad-statistics/ad-statistics.component';
import { SurveyStatisticsComponent } from './components/survey-statistics/survey-statistics.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"questionnaire",component:QuestionnaireComponent, canActivate:[LoginGuard]},
  {path:"ad",component:AdComponent, canActivate:[LoginGuard]},
  {path:"solve-questionnaire/:surveyId", component: SolveQuestionnaireComponent, canActivate:[LoginGuard] },
  {path:"wallet",component:WalletComponent},
  {path:"partnership",component:PartnershipComponent},
  {path:"create-survey",component:CreateSurveyComponent},
  {path:"contact",component:ContactComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"add-content",component:AddContentComponent},
  {path:"loginpartnership",component:PartnershipLoginComponent},
  {path:"ad-statistics",component:AdStatisticsComponent},
  {path:"survey-statistics",component:SurveyStatisticsComponent},
  {path:"forgetPassword/:resetToken",component:ForgetPasswordComponent},
  {path:"forgetPassword",component:ForgetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }