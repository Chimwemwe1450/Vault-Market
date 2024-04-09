import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ApprovedComponent } from './approved/approved.component';
import { DeclinedComponent } from './declined/declined.component';

@NgModule({
  declarations: [
    ApprovedComponent,
    DeclinedComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ApprovedComponent,
    DeclinedComponent
  ]
})
export class AnimatedIconsModule { }
