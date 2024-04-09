import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FabMenuComponent } from './fab-menu.component';

@NgModule({
  declarations: [
    FabMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FabMenuComponent
  ]
})
export class FabMenuModule { }
