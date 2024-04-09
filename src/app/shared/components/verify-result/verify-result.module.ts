import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { VerifyResultComponent } from './verify-result.component';

import { KycHeaderModule } from '../kyc-header/kyc-header.module';
import { AnimatedIconsModule } from '../animated-icons/animated-icons.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    KycHeaderModule,
    AnimatedIconsModule
  ],
  declarations: [VerifyResultComponent]
})
export class VerifyResultModule {}
