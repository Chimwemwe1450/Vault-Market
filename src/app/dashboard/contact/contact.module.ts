import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';
import { FabMenuModule } from 'src/app/shared/components/fab-menu/fab-menu.module';

import { ContactPage } from './contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactPageRoutingModule,
    FabMenuModule
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {}
