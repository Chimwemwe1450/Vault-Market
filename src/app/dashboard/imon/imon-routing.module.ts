import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImonPage } from './imon.page';

const routes: Routes = [
  {
    path: '',
    component: ImonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImonPageRoutingModule {}
