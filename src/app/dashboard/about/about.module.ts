import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule, 
    HttpClientModule,
  ],
  declarations: [AboutPage],
})
export class AboutPageModule {
  // pdfData = {
  //   name1: {
  //     status: false,
  //     url: 'https://vaultmarkets.trade/wp-content/uploads/Vaultmarkets-Pty-Ltd-AML-Policy-v2.0-Updated-11-Oct-2021.pdf',
  //   },
  //   name2: {
  //     status: false,
  //     url: 'https://vaultmarkets.trade/wp-content/uploads/Vaultmarkets-Pty-Ltd-Client-Agreement-v2.0-Updated-11-Oct-2021.pdf',
  //   },
  //   name3: {
  //     status: false,
  //     url: 'https://vaultmarkets.trade/wp-content/uploads/Complaints-Management-Policy.pdf',
  //   },
  //   name4: {
  //     status: false,
  //     url: 'https://vaultmarkets.trade/wp-content/uploads/Vaultmarkets-Pty-Ltd-Privacy-Policy-v2.0-Updated-11-Oct-2021.pdf',
  //   },
  // };
}
