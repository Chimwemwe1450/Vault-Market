import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqPage } from './faq.page';
import { Tab1Component } from './tab1/tab1.component';
import { Tab2Component } from './tab2/tab2.component';
import { Tab3Component } from './tab3/tab3.component';
import { Tab4Component } from './tab4/tab4.component';
import { Tab5Component } from './tab5/tab5.component';

const routes: Routes = [
  {
    path: '',
    component: FaqPage,
    children: [
      {
        path: 'tab1',
        component: Tab1Component
      },
      {
        path: 'tab2',
        component: Tab2Component
      },
      {
        path: 'tab3',
        component: Tab3Component
      },
      {
        path: 'tab4',
        component: Tab4Component
      },
      {
        path: 'tab5',
        component: Tab5Component
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqPageRoutingModule {}
