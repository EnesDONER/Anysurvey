import { WalletComponent } from './components/wallet/wallet.component';
import { AdsComponent } from './components/ads/ads.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import SolveQuestionnaireComponent from './components/solve-questionnaire/solve-questionnaire.component';
import { PartnershipComponent } from './components/partnership/partnership.component';
const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"questionnaire",component:QuestionnaireComponent},
  {path:"ads",component:AdsComponent},
  {path:"solvequestionnaire",component:SolveQuestionnaireComponent},
  {path:"wallet",component:WalletComponent},
  {path:"partnership",component:PartnershipComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }