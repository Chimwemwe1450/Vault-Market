import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FabMenuModule } from '../../shared/components/fab-menu/fab-menu.module';
import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { SearchComponent } from './search/search.component';
import { DepositComponent } from '../home/deposit/deposit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FabMenuModule,
    HistoryPageRoutingModule,
  ],
  declarations: [HistoryPage, SearchComponent, DepositComponent],
})
export class HistoryPageModule {}
