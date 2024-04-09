import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EconomicNewsPage } from './economic-news.page';

const routes: Routes = [
  {
    path: '',
    component: EconomicNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EconomicNewsPageRoutingModule {}
