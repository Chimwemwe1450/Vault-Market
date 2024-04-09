import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { PasswordConfirmationComponent } from 'src/app/shared/components/password-confirmation/password-confirmation.component';

import { TradingAccount } from 'src/app/shared/models/trading-account.model';
import { Wallet } from 'src/app/shared/models/wallet.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;

  public tradingAccount: TradingAccount;
  public walletAccount: Wallet;
  public toSelection: any;
  public amount: number;

  constructor(
    private modalController: ModalController,
    private _mainService: MainService,
    private _toastService: ToastService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._mainService.getWallets()
      .then(res => {
        const wallets: Array<Wallet> = res;
        this.walletAccount = wallets[0];
      });
  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.ontouchmove = (e) => {
      e.stopPropagation();
    };
  }

  public async onSubmit(): Promise<void> {
    if (!this.toSelection && !this.amount) {
      this._toastService.presentToast('Please complete the form', 'toast-warning');
      return;
    }
    const passwordCheck: boolean = await this.confirmPassword();

    if (passwordCheck) {
      let from: number | string;
      let to: number | string;

      if (this.toSelection === 'MYWALLET') {
        from = this.tradingAccount.account_id;
        to = 'MYWALLET';
      } else {
        from = 'MYWALLET';
        to = this.tradingAccount.account_id;
      }

      let itToken: string;
      const tokenRes = await this._authService.getAuthToken().then();

      if (tokenRes['success'] === true) {
        itToken = tokenRes['data'][0]['token'];
      } else {
        console.log('unable to get token');
        return;
      }

      this._mainService.createInternalTransfer(
        from,
        to,
        this.tradingAccount.at_id,
        this.amount,
        this.walletAccount.currency,
        itToken
      )
        .then(res => {
          if (res['success'] === true) {
            this._toastService.presentToast('Internal Transfer Successful', 'success');
            this.dismissModal('transfer');
          } else {
            this._toastService.presentToast(res.info.message, 'toast-warning');
          }

        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this._toastService.presentToast('Incorrect password.', 'toast-warning');
    }
  }


  private async confirmPassword(): Promise<boolean> {
    const modal = await this.modalController.create({
      component: PasswordConfirmationComponent,
      cssClass: 'my-custom-class'
    });
    await modal.present();

    return modal.onDidDismiss().then((res) => res.data.data);
  }

  private dismissModal(id: string) {
    this.modalController.dismiss({
      data: id
    });
  }

}
