import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EconomicNewsPageRoutingModule } from './economic-news-routing.module';

import { EconomicNewsPage } from './economic-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EconomicNewsPageRoutingModule
  ],
  declarations: [EconomicNewsPage]
})
export class EconomicNewsPageModule {}
