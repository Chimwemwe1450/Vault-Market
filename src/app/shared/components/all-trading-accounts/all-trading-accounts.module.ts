import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTradingAccountsComponent } from './all-trading-accounts.component';

import { OpenAccountComponent } from 'src/app/dashboard/trading-accounts/open-account/open-account.component';
import { SettingsComponent } from 'src/app/dashboard/trading-accounts/settings/settings.component';
import { TransferModule } from 'src/app/dashboard/home/transfer/transfer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransferModule,
    IonicModule,
  ],
  declarations: [
    AllTradingAccountsComponent,
    OpenAccountComponent,
    SettingsComponent,
  ],
  exports: [AllTradingAccountsComponent],
})
export class SearchTradingAccountModule {}
