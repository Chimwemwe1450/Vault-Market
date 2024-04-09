import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./dashboard/faq/faq.module').then((m) => m.FaqPageModule),
  },
  {
    path: 'terminologies',
    loadChildren: () =>
      import('./dashboard/terminologies/terminologies.module').then(
        (m) => m.TerminologiesPageModule
      ),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./dashboard/blogs/blogs.module').then((m) => m.BlogsPageModule),
  },
  {
    path: 'ebooks',
    loadChildren: () =>
      import('./dashboard/ebooks/ebooks.module').then(
        (m) => m.EbooksPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
