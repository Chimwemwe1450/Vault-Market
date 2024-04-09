import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { PfTab1Component } from '../profiletabs/pf-tab1/pf-tab1.component';
import { PfTab2Component } from '../profiletabs/pf-tab2/pf-tab2.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'tab1',
        component: PfTab1Component,
      },
      {
        path: 'tab2',
        component: PfTab2Component,
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
