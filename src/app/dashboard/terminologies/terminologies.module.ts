import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminologiesPageRoutingModule } from './terminologies-routing.module';

import { TerminologiesPage } from './terminologies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminologiesPageRoutingModule
  ],
  declarations: [TerminologiesPage]
})
export class TerminologiesPageModule {}
