import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminologiesPage } from './terminologies.page';

const routes: Routes = [
  {
    path: '',
    component: TerminologiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminologiesPageRoutingModule {}
