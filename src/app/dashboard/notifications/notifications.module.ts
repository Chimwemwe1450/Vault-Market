import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { FabMenuModule } from 'src/app/shared/components/fab-menu/fab-menu.module';

import { NotificationsPage } from './notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    FabMenuModule
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule {}
