import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { RegexConstants } from 'src/app/shared/constants/regex-constants';

import { Leverage } from 'src/app/shared/models/leverage.model';
import { TradingAccount } from 'src/app/shared/models/trading-account.model';

import { MainService } from 'src/app/shared/services/main.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { OpenAccountComponent } from '../open-account/open-account.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;

  public newPasswordForm: FormGroup;

  public tradingAccounts: Array<TradingAccount>;
  public leverages: Array<Leverage>;

  public showLeverages: number;
  public selectedLeverage: string;
  public showPasswordBlock: number;

  constructor(
    private _toastService: ToastService,
    private _mainService: MainService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.createForm();
    this.getLeverages();
  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.ontouchmove = (e) => {
      e.stopPropagation();
    };
  }

  public onLeverageRequest(id: number): void {
    if (!this.selectedLeverage) {
      this._toastService.presentToast('Select a leverage.', 'toast-warning');
      return;
    }
    console.log('id: ', +id);
    console.log('lev id: ', this.selectedLeverage);
    const accountId = id.toString();

    this._mainService.createLeverageRequest(accountId, this.selectedLeverage)
      .then(res => {
        if (res['success']) {
          this._toastService.presentToast('Leverage changed successfully.', 'success');
          this.showLeverages = undefined;
          this.selectedLeverage = undefined;
          this.dismissModal('settings');

        } else {
          this._toastService.presentToast(res['info']['message'], 'toast-warning');
        }

      })
      .catch(err => {
        console.log(err);
      });
  }

  public onPasswordChange(id): void {
    if (this.newPasswordForm.invalid) {
      this._toastService.presentToast('Please complete form.', 'toast-warning');
      return;
    }
    const pw = this.newPasswordForm.get('password').value;
    const confirmPw = this.newPasswordForm.get('confirmPassword').value;

    if (pw === confirmPw) {

      this._mainService.changeTradingPassword(id, pw)
      .then(res => {
        if (res['success']) {
          this._toastService.presentToast('Password changed successfully.', 'success');
          this.showPasswordBlock = undefined;
          this.newPasswordForm.reset();
          this.dismissModal('settings');

        } else {
          this._toastService.presentToast(res['info']['message'], 'toast-warning');
        }

      })
      .catch(err => {
        console.log(err);
      });

    } else {
      this._toastService.presentToast('Passwords don\'t match.', 'toast-warning');
    }

  }

  public showSettingsBlock(index: number, blockId: string): void {
    this.selectedLeverage = undefined;
    this.newPasswordForm.reset();

    if (this[blockId] !== this.showLeverages) {
      this.showLeverages = undefined;
    }
    if (this[blockId] !== this.showPasswordBlock) {
      this.showPasswordBlock = undefined;
    }

    if (this[blockId] === index) {
      this[blockId] = undefined;
    } else {
      this[blockId] = index;
    }
  }

  public async launchOpenAccountModal(): Promise<void> {
    this.dismissModal(null);

    const modal = await this.modalController.create({
      component: OpenAccountComponent,
      cssClass: 'drawer-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8]
    });
    await modal.present();

    return modal.onDidDismiss()
      .then((res) => {
        if (res.data === true) {
          // this.refreshAccounts();
        }
      });
  }


  private getLeverages(): void {
    this._mainService.getLeverage()
      .then(res => {
        this.leverages = res;
        const index = this.leverages.findIndex(item => item.val === '1000');
        this.leverages.splice(index, 1);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  private createForm(): void {
    this.newPasswordForm = new FormGroup({
      password: new FormControl(null, {
        validators: [Validators.pattern(RegexConstants.PasswordRegex), Validators.required]
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.pattern(RegexConstants.PasswordRegex), Validators.required]
      })
    });
  }

  private dismissModal(id: string) {
    this.modalController.dismiss({
      data: id
    });
  }

}
