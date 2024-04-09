import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BankAccount } from 'src/app/shared/models/bank-account.model';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss'],
})
export class BankAccountsComponent implements OnInit {

  @Input() data: Array<BankAccount>;
  @Output() createModal = new EventEmitter<boolean>(true);

  constructor() { }

  ngOnInit() { }

  public async launchModal(): Promise<void> {
    this.createModal.emit();
  }

}
