import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wallet } from 'src/app/shared/models/wallet.model';

@Component({
  selector: 'app-ewallet-accounts',
  templateUrl: './ewallet-accounts.component.html',
  styleUrls: ['./ewallet-accounts.component.scss'],
})
export class EwalletAccountsComponent implements OnInit {
  @Input() data: Array<Wallet>;
  @Output() createModal = new EventEmitter<boolean>();
// add service create_ewallet method  from main serivce   for ewallet account as awell as the functionaity from the html 
  constructor(


  ) { }

  ngOnInit(): void { }

  public launchModal(): void {
    this.createModal.emit(true);
  }

}