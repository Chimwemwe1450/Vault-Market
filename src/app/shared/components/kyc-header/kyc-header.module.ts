import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { KycHeaderComponent } from './kyc-header.component';

@NgModule({
  declarations: [
    KycHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    KycHeaderComponent
  ]
})
export class KycHeaderModule { }
