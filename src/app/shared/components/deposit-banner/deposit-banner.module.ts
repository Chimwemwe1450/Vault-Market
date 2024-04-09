import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DepositBannerComponent } from './deposit-banner.component';

@NgModule({
  declarations: [DepositBannerComponent],
  imports: [CommonModule, IonicModule],
  exports: [DepositBannerComponent],
})
export class DepositBannerModule {}
