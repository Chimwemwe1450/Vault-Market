import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { MainService } from '../../services/main.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ToastService } from '../../services/toast.service';

import { TradingAccount } from '../../models/trading-account.model';

import { TransferComponent } from '../../../dashboard/home/transfer/transfer.component';
import { OpenAccountComponent } from 'src/app/dashboard/trading-accounts/open-account/open-account.component';
import { SettingsComponent } from 'src/app/dashboard/trading-accounts/settings/settings.component';

@Component({
  selector: 'app-all-trading-accounts',
  templateUrl: './all-trading-accounts.component.html',
  styleUrls: ['./all-trading-accounts.component.scss'],
})
export class AllTradingAccountsComponent implements OnInit {
  public tradingAccounts: Array<TradingAccount> = [];
  public selectedAccount: TradingAccount;

  public customActionSheetOptions = {
    header: 'Trading Accounts',
    subHeader:
      '- No trading accounts found. Please create a trading account in order to transfer funds and trade. -',
  };
  constructor(
    private _mainService: MainService,
    private _authService: AuthService,
    private _toastService: ToastService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.subscribeToAccountsChange();
    this.getAccounts();
  }

  public accountSelection(): void {
    const id = this.selectedAccount.account_id.toString();
    this._authService.setTradingAccountId = id;
    this._mainService.pushCurrentTradingAccount(this.selectedAccount);
  }

  public async launchTransferModal(
    selectedAccount: TradingAccount
  ): Promise<void> {
    this.selectedAccount = selectedAccount;

    if (!this.selectedAccount) {
      this._toastService.presentToast(
        'Select a trading account to transfer funds ',
        'toast-warning'
      );
      return;
    }

    const modal = await this.modalController.create({
      cssClass: 'drawer-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
      component: TransferComponent,
      componentProps: {
        tradingAccount: this.selectedAccount,
      },
    });
    await modal.present();

    return modal.onDidDismiss().then((res) => {
      if (res.data === 'transfer') {
        this.refreshAccounts();
      }
    });
  }

  public async launchOpenAccountModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: OpenAccountComponent,
      cssClass: 'drawer-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
    });
    await modal.present();

    return modal.onDidDismiss().then((res) => {
      if (res.data === true) {
        // this.refreshAccounts();
      }
    });
  }

  public async launchSettingsModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SettingsComponent,
      componentProps: {
        tradingAccounts: this.tradingAccounts,
      },
      cssClass: 'drawer-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
    });
    await modal.present();

    return modal.onDidDismiss().then((res) => {
      if (res.data === 'settings') {
        // this.refreshAccounts();
      }
    });
  }

  private refreshAccounts(): void {
    this._mainService.refreshTradingAccounts().then();
  }

  private getAccounts(): void {
    this._mainService
      .getTradingAccounts()
      .then((res) => {
        this.tradingAccounts = res;
        this.selectedAccount = this._mainService.getCurrentTradingAccount();
        this._mainService.pushCurrentTradingAccount(this.selectedAccount);

        if (this.tradingAccounts.length) {
          delete this.customActionSheetOptions.subHeader;
        }
      })
      .catch((err) => {
        console.log('error: ', err);
        this._toastService.presentToast(err, 'toast-warning');

        if (this.tradingAccounts.length) {
          delete this.customActionSheetOptions.subHeader;
        }
      });
  }

  private subscribeToAccountsChange(): void {
    this._mainService.tradingAccountsSubject.subscribe(
      (accounts: Array<TradingAccount>) => {
        if (accounts) {
          this.tradingAccounts = accounts;
          this.selectedAccount = this._mainService.getCurrentTradingAccount();
          this._mainService.pushCurrentTradingAccount(this.selectedAccount);
        }
      }
    );
  }
}
