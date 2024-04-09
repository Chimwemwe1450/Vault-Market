import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { FabMenuModule } from '../../shared/components/fab-menu/fab-menu.module';
import { CountrySelectListModule } from '../../shared/components/country-select-list/country-select-list.module';
import { SearchTradingAccountModule } from '../../shared/components/select-trading-account/select-trading-account.module';
import { TransferModule } from './transfer/transfer.module';

import { HomePage } from './home.page';

import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { CreateBankAccountComponent } from './bank-accounts/create-bank-account/create-bank-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { EwalletAccountsComponent } from './ewallet-accounts/ewallet-accounts.component';
import { CreateEwalletComponent } from './ewallet-accounts/create-ewallet/create-ewallet.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    FabMenuModule,
    CountrySelectListModule,
    SearchTradingAccountModule,
    TransferModule,
  ],
  declarations: [
    HomePage,
    BankAccountsComponent,
    CreateBankAccountComponent,
    DepositComponent,
    EwalletAccountsComponent,
    CreateEwalletComponent,
    WithdrawComponent,
  ],
})
export class HomePageModule {}
