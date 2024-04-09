import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImonPageRoutingModule } from './imon-routing.module';

import { ImonPage } from './imon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImonPageRoutingModule
  ],
  declarations: [ImonPage]
})
export class ImonPageModule {}
