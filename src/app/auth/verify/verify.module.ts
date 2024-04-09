import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyPageRoutingModule } from './verify-routing.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { KycHeaderModule } from 'src/app/shared/components/kyc-header/kyc-header.module';

import { VerifyPage } from './verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyPageRoutingModule,
    FooterModule,
    HeaderModule,
    KycHeaderModule
  ],
  declarations: [
    VerifyPage
  ]
})
export class VerifyPageModule {}
