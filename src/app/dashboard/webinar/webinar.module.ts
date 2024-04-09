import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebinarPageRoutingModule } from './webinar-routing.module';

import { WebinarPage } from './webinar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebinarPageRoutingModule
  ],
  declarations: [WebinarPage]
})
export class WebinarPageModule {}
