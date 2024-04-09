import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradingAccountsPage } from './trading-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: TradingAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradingAccountsPageRoutingModule {}
