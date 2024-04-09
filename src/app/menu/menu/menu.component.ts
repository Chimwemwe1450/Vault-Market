import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import { ModalController } from '@ionic/angular';

import { UserMenuData } from 'src/app/shared/models/user-menu-data.model';

import { AboutPage } from 'src/app/dashboard/about/about.page';

import { Profile } from 'src/app/shared/models/profile.model';
import { TradingAccount } from 'src/app/shared/models/trading-account.model';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  
  selectedItem: string;
  public profileImageUrl: string;

  public iosDevice = false;
  public disableMenu = false;
  public userMenuData: UserMenuData = new UserMenuData();
  public balance: string;
  public accountType: string;
  public account: string;

  constructor(
    private _authService: AuthService,
    private _mainService: MainService,
    private _alertService: AlertService,
    private router: Router,
    private modalController: ModalController,
    private _storageService: StorageService,
    private platform: Platform
  ) {}

  ngOnInit() {
    

    const profileImageResponse = localStorage.getItem('profileImageResponse');
  if (profileImageResponse) {
    const response = JSON.parse(profileImageResponse);
    this.profileImageUrl = response.new_profile_image_url;  // Replace 'new_profile_image_url' with the actual property name in the response
  }
    this.checkPlatform();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/auth/login' ||
          event.url === '/auth/register' ||
          event.url === '/auth/verify' ||
          event.url === '/auth/risk-assessment'
        ) {
          this.disableMenu = true;
        } else {
          this.disableMenu = false;
        }
      }
    });
    this.getUserMenuData();
  }

  selectItem(itemId: string) {
    this.selectedItem = itemId;
  }

  public menuClosed(): void {
    console.log('close menu');
  }

  public menuOpened(): void {
    console.log('open menu');
  }

  
  public getSavedImage(): string | null {
    return localStorage.getItem('uploadedImage');
  }

  /* public openFirst(): void {
    this.menu.enable(true, 'first');
    this.menu.open('first');
    console.log('open first');
  }

  public openEnd(): void {
    this.menu.open('sideMenu');
    console.log('open end');
  }

  public openCustom(): void {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log('open custom');
  } */

  public logUserOut(): void {
    this._alertService.presentAlert(
      'Signing Out',
      'Sure you want to Sign Out?',
      'Yes',
      'No',
      async () => {
        this._authService
          .logOut()
          .then((res) => {
            if (res.success) {
              this._storageService.setCurrentUser(null);
              this.router.navigate(['auth/login']);
            } else {
              this._storageService.setCurrentUser(null);
              this.router.navigate(['auth/login']);
            }
          })
          .catch((err) => {
            console.log('error logging out');
          });
      },
      async () => {}
    );
  }

  public async displayAboutModal(): Promise<void> {
    // this.dismissPopover();

    const modal = await this.modalController.create({
      component: AboutPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    this._authService.userDataSubject.unsubscribe();
  }

  private getUserMenuData(): void {
    if (this._authService.getFirstName) {
      this.userMenuData.firstName = this._authService.getFirstName;
      this.userMenuData.lastName = this._authService.getLastName;
      this.userMenuData.user = this._authService.getUser;
      this.userMenuData.currency = this._authService.getCurrency;
      this.userMenuData.tradingAccount = this._authService.getTradingAccountId;
    } else {
      this._authService.userDataSubject.subscribe((data: Profile) => {
        if (data) {
          this.userMenuData = {
            firstName: data.fname,
            lastName: data.lname,
            user: data.customer_no,
            currency: data.currency,
            tradingAccount: undefined,
          };
        }
      });
    }
    this._mainService.currentTradingAccSubject.subscribe(
      (value: TradingAccount) => {
        if (value) {
          this.userMenuData.tradingAccount = value.account_id.toString();
          this.balance = value.balance_formatted;
          this.accountType = value.account_type_name;
          this.account = value.login;
        }
      }
    );
  }

  private checkPlatform() {
    if (this.platform.is('ios')) {
      this.iosDevice = true;
    }
  }
}
