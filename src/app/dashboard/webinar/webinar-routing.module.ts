import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebinarPage } from './webinar.page';

const routes: Routes = [
  {
    path: '',
    component: WebinarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebinarPageRoutingModule {}
