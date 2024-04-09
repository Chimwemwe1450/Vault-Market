import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { ModalController, ModalOptions } from '@ionic/angular';

import { MainService } from 'src/app/shared/services/main.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';

import { DepositComponent } from '../home/deposit/deposit.component';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-trading-accounts',
  templateUrl: './trading-accounts.page.html',
  styleUrls: ['./trading-accounts.page.scss'],
})
export class TradingAccountsPage implements OnInit, AfterViewInit {
  public screenSelection = '';
  public balance: string;
  public currency: string;

  public depositPrompt = false;

  constructor(
    private renderer: Renderer2,
    private _mainService: MainService,
    private modalController: ModalController,
    private _authService: AuthService,
    private soliticsService: SoliticsService,
  ) {}

  ngOnInit() {
    this.balance = '0.00';
    this.currency = this._authService.getCurrency;

    this._mainService.balanceSubject.subscribe((value: string) => {
      if (value) {
        this.balance = value;
      }
    });
    this.reportPageEnter('teading-accountPage');
  }

  ngAfterViewInit(): void {}
  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
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
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('tradingaccountPage');
  }
  private buildOptions(screen: string): ModalOptions {
    const options: ModalOptions = {
      cssClass: 'drawer-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
      component: undefined,
    };

    switch (screen) {
      case 'deposit':
        options.component = DepositComponent;
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
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }

  private getAllTransferData(): void {
    this._mainService.refreshTradingAccounts();
  }
}
