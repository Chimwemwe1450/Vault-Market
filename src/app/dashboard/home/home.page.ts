import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  IonInfiniteScroll,
  ModalController,
  ModalOptions,
} from '@ionic/angular';

import { Subscription } from 'rxjs';

import { MainService } from 'src/app/shared/services/main.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { Profile } from 'src/app/shared/models/profile.model';

import { Wallet } from 'src/app/shared/models/wallet.model';
import { TradingAccount } from 'src/app/shared/models/trading-account.model';
import { Account } from 'src/app/shared/models/selected-account.model';
import { BankAccount } from 'src/app/shared/models/bank-account.model';
import { Country } from 'src/app/shared/models/country.model';

import { DepositComponent } from './deposit/deposit.component';
import { CreateEwalletComponent } from './ewallet-accounts/create-ewallet/create-ewallet.component';
import { TransferComponent } from './transfer/transfer.component';
import { CreateBankAccountComponent } from './bank-accounts/create-bank-account/create-bank-account.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

import { tabSlideAnimation } from 'src/app/shared/animations/animation-styles';

import { environment } from 'src/environments/environment';
import { PaymentService } from 'src/app/shared/services/Payment.service';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
// import { ExamplePdfViewerComponent } from 'src/app/example-pdf-viewer/example-pdf-viewer.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [tabSlideAnimation],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public balance: string;
  public userName: string;
  public currency: string;
  public depositPrompt = false;

  public walletData: Array<Wallet> = [];
  public tradingAccData: Array<TradingAccount> = [];
  public bankAccData: Array<BankAccount> = [];
  // public ExamplePdfViewerComponent: ExamplePdfViewerComponent;

  public accounts: Array<Account> = [];
  public countries: Array<Country>;

  public screenSelection: string;
  public tab = 0;

  private routeSubscriber: Subscription;
  private balanceSub: Subscription;
  private userNameSub: Subscription;

  constructor(
    private _mainService: MainService,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private _toastService: ToastService,
    private paymentService: PaymentService,
    private soliticsService: SoliticsService,
  ) {
    console.log('PROD: ', environment.production);
  }
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }
  ngOnInit() {
    this.getWallets();
    this.getTradingAccounts();
    this.getBankAccounts();
    this.getAllCountries();
    this.reportPageEnter('DashboardPage');
    this.subscribeToRoute();
    this.userNameSub = this._authService.userDataSubject.subscribe(
      (value: Profile) => {
        if (value) {
          this.userName = value.fname;
        }
      }
    );
    this.balanceSub = this._mainService.balanceSubject.subscribe(
      (value: string) => {
        if (value) {
          this.balance = value;
        }
      }
    );

    this.userName = this._authService.getFirstName;
    this.currency = this._authService.getCurrency;
    this.balance = this._mainService.balanceSubject.getValue();

    if (this.balance === '') {
      this._mainService.getWallets().then();
    }
  }

  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
    this.balanceSub.unsubscribe();
    this.userNameSub.unsubscribe();
    this.reportPageLeave('HomePage');
  }

  public tabSelection(event: any): void {
    this.tab = parseInt(event.target.value, 10);
  }

  public async screenSelector(screenName: string): Promise<void> {
    const modalOptions: ModalOptions = { ...this.buildOptions(screenName) };

    if (!modalOptions.component) {
      return;
    }

    this.screenSelection = screenName;
    const modal = await this.modalController.create({
      ...modalOptions,
    });

    await modal.present();

    return modal.onDidDismiss().then((res) => {
      this.screenSelection = undefined;
      if (!res.data) {
        return;
      }

      this.onCompletion(res.data.data);
    });
  }

  private buildOptions(screen: string): ModalOptions {
    const options: ModalOptions = {
      cssClass: 'drawer-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
      component: undefined,
    };

    switch (screen) {
      case 'bankAccount':
        options.component = CreateBankAccountComponent;
        break;
      case 'deposit':
        options.component = DepositComponent;
        break;
      case 'ewallet':
        options.component = CreateEwalletComponent;
        options.componentProps = { countries: this.countries };
        break;
      case 'transfer':
        const account = this._mainService.getCurrentTradingAccount();

        if (!account) {
          this._toastService.presentToast(
            'Select a trading account to transfer funds ',
            'toast-warning'
          );
          break;
        }
        options.component = TransferComponent;
        options.componentProps = {
          tradingAccount: account,
        };
        break;
      case 'withdraw':
        options.component = WithdrawComponent;
        break;
    }

    return options;
  }

  private onCompletion(res: string): void {
    console.log(res);

    if (res === 'deposit') {
      this.getAllTransferData();
    }
    if (res === 'transfer') {
      this.getAllTransferData();
    }
  }

  private getWallets(): void {
    this._mainService
      .getWallets()
      .then((res) => {
        this.walletData = res;

        for (const i of this.walletData) {
          const account: Account = {
            account_id: 'MYWALLET',
            account_type_name: i.currency,
            currency: i.currency,
            login: 'MYWALLET',
            balance_formatted: i.balance_formatted,
            credit_formatted: i.credit_formatted,
            equity_formatted: undefined,
            at_id: undefined,
            isTrading: false,
          };

          this.accounts.push(account);
        }
      })
      .catch((err) => {
        console.log('error: ', err);
        // this._toastService.presentToast(err, 'toast-warning');
      });
  }

  private getTradingAccounts(): void {
    this._mainService
      .getTradingAccounts()
      .then((res) => {
        this.tradingAccData = res;

        for (const i of this.tradingAccData) {
          const account: Account = {
            account_id: i.account_id,
            account_type_name: i.account_type_name,
            currency: i.currency,
            login: i.login,
            balance_formatted: i.balance_formatted,
            credit_formatted: i.credit_formatted,
            equity_formatted: i.equity_formatted,
            at_id: i.at_id,
            isTrading: true,
          };

          this.accounts.push(account);
        }
      })
      .catch((err) => {
        console.log('error: ', err);
        // this._toastService.presentToast(err, 'toast-warning');
      });
  }

  private getBankAccounts(): void {
    this._mainService
      .getBankAccounts()
      .then((res) => {
        this.bankAccData = res;
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  private getAllCountries(): void {
    this._mainService
      .getCountries()
      .then((res) => {
        this.countries = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getAllTransferData(): void {
    this.accounts = [];
    this.getWallets();
    this.getTradingAccounts();
    this._mainService.refreshTradingAccounts();
  }
  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }
  private subscribeToRoute(): void {
    this.routeSubscriber = this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('section')) {
        this.screenSelector(params['section']);
      }
    });
  }
}
