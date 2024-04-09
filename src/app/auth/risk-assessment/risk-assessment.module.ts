import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { RiskAssessmentPageRoutingModule } from './risk-assessment-routing.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { KycHeaderModule } from 'src/app/shared/components/kyc-header/kyc-header.module';

import { RiskAssessmentPage } from './risk-assessment.page';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { SearchSelectListComponent } from 'src/app/shared/components/search-select-list/search-select-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RiskAssessmentPageRoutingModule,
    HeaderModule,
    SwiperModule,
    KycHeaderModule
  ],
  declarations: [
    RiskAssessmentPage,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    SearchSelectListComponent
  ]
})
export class RiskAssessmentPageModule {}
