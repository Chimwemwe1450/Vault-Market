import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TradingAccountsPageRoutingModule } from './trading-accounts-routing.module';
import { FabMenuModule } from '../../shared/components/fab-menu/fab-menu.module';
import { SearchTradingAccountModule } from '../../shared/components/all-trading-accounts/all-trading-accounts.module';

import { TradingAccountsPage } from './trading-accounts.page';
// import { AllTradingAccountsPage } from '../../shared/components/all-trading-accounts/all-trading-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TradingAccountsPageRoutingModule,
    FabMenuModule,
    SearchTradingAccountModule,
  ],
  declarations: [TradingAccountsPage],
})
export class TradingAccountsPageModule {}
