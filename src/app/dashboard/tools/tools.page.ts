import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  OnChanges,
} from '@angular/core';

import { ModalController, ModalOptions } from '@ionic/angular';

import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';
import { AfterViewInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DepositComponent } from '../home/deposit/deposit.component';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('tradingviewWidget') tradingviewWidget: any;
  @ViewChild('tradingview') tradingView: ElementRef;
  public colorTheme = '';

  public screenSelection = '';
  public balance: string;
  public currency: string;

  public depositPrompt = false;

  constructor(
    private _mainService: MainService,
    private _storageService: StorageService,
    private modalController: ModalController,
    private _authService: AuthService,
    private soliticsService: SoliticsService,
  ) {
    console.log('PROD: ', environment.production);
  }

  ngOnInit(): void {
    
    this.reportPageEnter('toolsPage');
    this.balance = '0.00';
    this.currency = this._authService.getCurrency;

    this._mainService.balanceSubject.subscribe((value: string) => {
      if (value) {
        this.balance = value;
      }
    });
 

    const lightMode =
      this._storageService.getUserPreference<boolean>('lightMode') || false;
    console.log('lightMode: ', lightMode);
    this.colorTheme = lightMode ? 'dark' : 'light';
    console.log('colorTheme: ', this.colorTheme);
  }
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
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }
  public changeColorTheme(event: any) {}

  ngOnChanges(): void {
    // Get the value of lightMode from the StorageService
    const lightMode =
      this._storageService.getUserPreference<boolean>('lightMode');
    console.log('lightMode: ', lightMode);
    // Set the colorTheme property based on the value of lightMode
    this.colorTheme = lightMode ? 'dark' : 'light';
    console.log('colorTheme: ', this.colorTheme);
    // this.generateTradingviewCharts(options);
  }



  ngOnDestroy(): void {
    // this.balanceSub.unsubscribe();
    // this.userNameSub.unsubscribe();
    this.reportPageLeave('toolsPage');
  }

  ngAfterViewInit(): void {
    const options = {
      colorTheme: this.colorTheme,
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: '100%',
      height: '570',
      plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
      plotLineColorFalling: 'rgba(41, 98, 255, 1)',
      gridLineColor: 'rgba(240, 243, 250, 0)',
      scaleFontColor: 'rgba(120, 123, 134, 1)',
      belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
      belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
      symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
      tabs: [
        {
          title: 'Indices',
          symbols: [
            {
              s: 'FOREXCOM:SPXUSD',
              d: 'S&P 500',
            },
            {
              s: 'FOREXCOM:NSXUSD',
              d: 'US 100',
            },
            {
              s: 'FOREXCOM:DJI',
              d: 'Dow 30',
            },
            {
              s: 'INDEX:NKY',
              d: 'Nikkei 225',
            },
            {
              s: 'INDEX:DEU40',
              d: 'DAX Index',
            },
            {
              s: 'FOREXCOM:UKXGBP',
              d: 'UK 100',
            },
          ],
          originalTitle: 'Indices',
        },
        {
          title: 'Futures',
          symbols: [
            {
              s: 'CME_MINI:ES1!',
              d: 'S&P 500',
            },
            {
              s: 'CME:6E1!',
              d: 'Euro',
            },
            {
              s: 'COMEX:GC1!',
              d: 'Gold',
            },
            {
              s: 'NYMEX:CL1!',
              d: 'Crude Oil',
            },
            {
              s: 'NYMEX:NG1!',
              d: 'Natural Gas',
            },
            {
              s: 'CBOT:ZC1!',
              d: 'Corn',
            },
          ],
          originalTitle: 'Futures',
        },
        {
          title: 'Bonds',
          symbols: [
            {
              s: 'CME:GE1!',
              d: 'Eurodollar',
            },
            {
              s: 'CBOT:ZB1!',
              d: 'T-Bond',
            },
            {
              s: 'CBOT:UB1!',
              d: 'Ultra T-Bond',
            },
            {
              s: 'EUREX:FGBL1!',
              d: 'Euro Bund',
            },
            {
              s: 'EUREX:FBTP1!',
              d: 'Euro BTP',
            },
            {
              s: 'EUREX:FGBM1!',
              d: 'Euro BOBL',
            },
          ],
          originalTitle: 'Bonds',
        },
        {
          title: 'Forex',
          symbols: [
            {
              s: 'FX:EURUSD',
              d: 'EUR/USD',
            },
            {
              s: 'FX:GBPUSD',
              d: 'GBP/USD',
            },
            {
              s: 'FX:USDJPY',
              d: 'USD/JPY',
            },
            {
              s: 'FX:USDCHF',
              d: 'USD/CHF',
            },
            {
              s: 'FX:AUDUSD',
              d: 'AUD/USD',
            },
            {
              s: 'FX:USDCAD',
              d: 'USD/CAD',
            },
          ],
          originalTitle: 'Forex',
        },
      ],
    };

    this.generateTradingviewCharts(options);
  }

  public generateTradingviewCharts(options: any): void {
    const objString: string = JSON.stringify(options);

    const marketsScript = document.createElement('script');
    marketsScript['type'] = 'text/javascript';
    marketsScript['src'] =
      'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    marketsScript['text'] = objString;

    this.tradingView.nativeElement.appendChild(marketsScript);

    const eventsScript = document.createElement('script');
    eventsScript.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    eventsScript.async = true;
    eventsScript.innerHTML = JSON.stringify({
      colorTheme: this.colorTheme,
      isTransparent: true,
      width: '100%',
      height: '500',
      locale: 'en',
      importanceFilter: '-1,0,1',
    });

    this.tradingviewWidget.nativeElement.appendChild(eventsScript);
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

  private getAllTransferData(): void {
    this._mainService.refreshTradingAccounts();
  }
}
