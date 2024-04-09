import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  IonInfiniteScroll,
  ModalController,
  ModalOptions,
} from '@ionic/angular';

import { MainService } from 'src/app/shared/services/main.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';

import { UserTransaction } from 'src/app/shared/models/user-transaction.model';
import { SearchDateRange } from 'src/app/shared/models/search-date-range.model';

import { SearchComponent } from './search/search.component';
import { DepositComponent } from '../home/deposit/deposit.component';

import { fadeAnimation } from '../../shared/animations/animation-styles';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  animations: [fadeAnimation],
})
export class HistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('History Page');
  }
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }
  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }

  public advancedSearchForm: FormGroup;
  public transactions: Array<UserTransaction> = [];
  public transactionsDisplayed: Array<UserTransaction> = [];
  public transactionsObject = {
    data: [],
    start: 0,
    end: 0,
    perPage: 5,
    totalData: 0,
  };

  public showAdvancedSearch = false;
  public showSearchResult = false;
  public loading = false;

  public balance: string;
  public currency: string;
  public depositPrompt = false;

  public screenSelection: string;

  constructor(
    private _mainService: MainService,
    private modalController: ModalController,
    private _authService: AuthService,
    private soliticsService: SoliticsService,
  ) {}

  ngOnInit() {
    this.reportPageEnter('HistoryPage');
    this.createForm();
    this.getDefaultData();
    this.balance = '0.00';
    this.currency = this._authService.getCurrency;

    this._mainService.balanceSubject.subscribe((value: string) => {
      if (value) {
        this.balance = value;
      }
    });
  }

  public async launchSearchModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'drawer-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
    });

    await modal.present();

    return modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.onSearch(res.data);
      }
    });
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

  public clearSearch(): void {
    this.advancedSearchForm.reset({}, { emitEvent: false });
    this.updateData(this.transactions);
  }

  public toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  public doInfinite(event): void {
    this.transactionsObject.start += this.transactionsObject.perPage;
    this.transactionsObject.end += this.transactionsObject.perPage;

    setTimeout(() => {
      const result: Array<UserTransaction> = this.transactionsObject.data.slice(
        this.transactionsObject.start,
        this.transactionsObject.end
      );
      this.transactionsDisplayed.push(...result);

      event.target.complete();
    }, 2000);
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

  // private subscribeToRoute(): void {
  //   this.routeSubscriber = this.route.queryParams.subscribe((params) => {
  //     if (params.hasOwnProperty('section')) {
  //       this.screenSelector(params['section']);
  //     }
  //   });
  // }

  private async onSearch(searchValues: SearchDateRange): Promise<void> {
    this.showSearchResult = false;
    this.transactions = await this.search(searchValues, true);

    if (this.advancedSearchForm.pristine) {
      this.updateData(this.transactions);
    } else {
      const formValues = this.advancedSearchForm.value;
      this.onFilter(formValues);
    }
  }

  private createForm(): void {
    this.advancedSearchForm = new FormGroup({
      type: new FormControl(null),
      method: new FormControl(null),
      status: new FormControl(null),
    });

    this.subscribeToFormValue();
  }

  private onFilter(value: any): void {
    this.transactionsDisplayed = [];

    const result = this.transactions.filter((obj: UserTransaction) => {
      if (value['type'] !== null) {
        if (
          value['type'] === obj.type &&
          (value['method'] === obj.method_name || value['method'] === null) &&
          (value['status'] === obj.status || value['status'] === null)
        ) {
          return obj;
        }
      }
      if (value['method'] !== null) {
        if (
          (value['type'] === obj.type || value['type'] === null) &&
          value['method'] === obj.method_name &&
          (value['status'] === obj.status || value['status'] === null)
        ) {
          return obj;
        }
      }
      if (value['status'] !== null) {
        if (
          (value['type'] === obj.type || value['type'] === null) &&
          (value['method'] === obj.method_name || value['method'] === null) &&
          value['status'] === obj.status
        ) {
          return obj;
        }
      }
    });

    this.updateData(result);
  }

  private async getDefaultData(): Promise<void> {
    const dates: SearchDateRange = this.buildDates();

    this.transactions = await this.search(dates, false);
    this.updateData(this.transactions);
  }

  private buildDates(): SearchDateRange {
    const now = new Date();
    const day = now.getDate().toString();
    const month = (now.getMonth() + 1).toString();
    const year = now.getFullYear();

    const lastWeek = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const lastWeekDay = lastWeek.getDate().toString();
    const lastWeekMonth = (lastWeek.getMonth() + 1).toString();
    const lastWeekYear = lastWeek.getFullYear();

    const to = `${day.length === 1 ? '0' + day : day}/${
      month.length === 1 ? '0' + month : month
    }/${year}`;
    let from = `${lastWeekDay.length === 1 ? '0' + lastWeekDay : lastWeekDay}/`;
    from += `${
      lastWeekMonth.length === 1 ? '0' + lastWeekMonth : lastWeekMonth
    }/`;
    from += `${lastWeekYear}`;

    return { dateFrom: from, dateTo: to };
  }

  private async search(
    searchValues: SearchDateRange,
    update: boolean
  ): Promise<Array<UserTransaction>> {
    return await this._mainService
      .getUserTransactions(searchValues.dateFrom, searchValues.dateTo, update)
      .then((res) => {
        this.showSearchResult = true;
        return res;
      })
      .catch((err) => {
        return undefined;
      });
  }

  private updateData(data: Array<UserTransaction>): void {
    if (!data) {
      return;
    }
    this.loading = true;

    setTimeout(() => {
      this.transactionsObject.data = data;
      this.transactionsObject.start = 0;
      this.transactionsObject.end = this.transactionsObject.perPage;
      this.transactionsObject.totalData = data.length;

      this.transactionsDisplayed = data.slice(
        this.transactionsObject.start,
        this.transactionsObject.end
      );
      this.loading = false;
    }, 500);
  }

  private subscribeToFormValue(): void {
    this.advancedSearchForm.valueChanges.subscribe((value) => {
      if (this.advancedSearchForm.valid) {
        this.onFilter(value);
      }
    });
  }
}
