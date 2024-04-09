import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfitCalculatorPage } from './profit-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: ProfitCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitCalculatorPageRoutingModule {}
