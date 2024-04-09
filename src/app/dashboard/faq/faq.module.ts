import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqPageRoutingModule } from './faq-routing.module';

import { FaqPage } from './faq.page';
import { Tab1Component } from './tab1/tab1.component';
import { Tab2Component } from './tab2/tab2.component';
import { Tab3Component } from './tab3/tab3.component';
import { Tab4Component } from './tab4/tab4.component';
import { Tab5Component } from './tab5/tab5.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqPageRoutingModule
  ],
  declarations: [FaqPage, Tab1Component, Tab2Component, Tab3Component, Tab4Component, Tab5Component],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FaqPageModule {}
