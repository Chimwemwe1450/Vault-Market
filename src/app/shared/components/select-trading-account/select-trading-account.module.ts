import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTradingAccountComponent } from './select-trading-account.component';
import { OpenAccountComponent } from 'src/app/dashboard/trading-accounts/open-account/open-account.component';
import { SettingsComponent } from 'src/app/dashboard/trading-accounts/settings/settings.component';

import { TransferModule } from 'src/app/dashboard/home/transfer/transfer.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TransferModule,
  ],
  declarations: [
    SelectTradingAccountComponent,
    OpenAccountComponent,
    SettingsComponent,
  ],
  exports: [SelectTradingAccountComponent],
})
export class SearchTradingAccountModule {}
