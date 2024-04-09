import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    data: {
      title: 'Profile',
    },
  },
  {
    path: 'trading-accounts',
    loadChildren: () =>
      import('./trading-accounts/trading-accounts.module').then(
        (m) => m.TradingAccountsPageModule
      ),
    data: {
      title: 'Trading',
    },
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
    data: {
      title: 'Ts & Cs',
    },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
    data: {
      title: 'Contact',
    },
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
    data: {
      title: 'Notifications',
    },
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./history/history.module').then((m) => m.HistoryPageModule),
    data: {
      title: 'History',
    },
  },
  {
    path: 'profit-calculator',
    loadChildren: () =>
      import('./profit-calculator/profit-calculator.module').then(
        (m) => m.ProfitCalculatorPageModule
      ),
    data: {
      title: 'Profit Calculator',
    },
  },
  {
    path: 'webinar',
    loadChildren: () =>
      import('./webinar/webinar.module').then((m) => m.WebinarPageModule),
    data: {
      title: 'Podcasts',
    },
  },
  {
    path: 'terminologies',
    loadChildren: () =>
      import('./terminologies/terminologies.module').then(
        (m) => m.TerminologiesPageModule
      ),
    data: {
      title: 'Terminologies',
    },
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./blogs/blogs.module').then((m) => m.BlogsPageModule),
    data: {
      title: 'Blogs',
    },
  },
  {
    path: 'ebooks',
    loadChildren: () =>
      import('./ebooks/ebooks.module').then((m) => m.EbooksPageModule),
    data: {
      title: 'Ebooks',
    },
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then((m) => m.FaqPageModule),
    data: {
      title: 'FAQ',
    },
  },
  {
    path: 'tools',
    loadChildren: () =>
      import('./tools/tools.module').then((m) => m.ToolsPageModule),
    data: {
      title: 'Tools',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
