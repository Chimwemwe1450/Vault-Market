import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfitCalculatorPageRoutingModule } from './profit-calculator-routing.module';

import { ProfitCalculatorPage } from './profit-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfitCalculatorPageRoutingModule
  ],
  declarations: [ProfitCalculatorPage]
})
export class ProfitCalculatorPageModule {}
