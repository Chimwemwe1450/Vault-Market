import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferComponent } from '../../../dashboard/home/transfer/transfer.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  declarations: [TransferComponent],
  exports: [TransferComponent],
})
export class TransferModule {}
