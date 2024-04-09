import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { Leverage } from 'src/app/shared/models/leverage.model';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.scss'],
})
export class OpenAccountComponent implements OnInit, AfterViewInit {
  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;

  public isVault1000Selected: boolean = false;
  
  public createTradingAccForm: FormGroup;
  public leverages: Array<Leverage> = [];
  public currencySelect: string;
  public isLeverageDisabled: boolean = false;
  public showCompTable = false;
  public compTableLabel = 'Account Comparison Table';

  constructor(
    private _toastService: ToastService,
    private _authService: AuthService,
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

  public async onAccountCreate(): Promise<void> {
    if (this.createTradingAccForm.invalid) {
      this._toastService.presentToast('Please complete the form.', 'toast-warning');
      return;
    }

    const leverage: Leverage = this.createTradingAccForm.get('leverage').value;
    let itToken: string;
    const tokenRes = await this._authService.getAuthToken().then();

    if (tokenRes.success) {
      itToken = tokenRes.data[0]['token'];
    } else {
      console.log('Unable to get token.');
      return;
    }

    this._mainService.createTradingAccount(leverage.val, itToken)
      .then(async res => {
        if (res.success) {
          const response = res.data[0];
          let message = 'Trading account creation successful.';
          message += '<br>' + `Login: ${response['login']}`;
          message += '<br>' + `Password: ${response['password']}`;
          message += '<br>' + `Investor Password: ${response['investor_password']}`;

          this._toastService.presentToastWithButton(message, 'Ok', 'success');

          this.createTradingAccForm.reset();
          this.dismissModal(true);
        } else {
          this._toastService.presentToast(res['info']['message'], 'toast-warning');
        }
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  public currencySelection(event: Event): void {
    this.currencySelect = event['detail']['value'];
    console.log('currency select: ', this.currencySelect);
  }

  public toggleCompTable(): void {
    this.showCompTable = !this.showCompTable;

    if (this.showCompTable) {
      this.compTableLabel = 'Close Comparison Table';
    } else {
      this.compTableLabel = 'Account Comparison Table';
    }
  }

  public onTypeChange(): void {
    const currency = this.createTradingAccForm.get('currency').value;
    this.isVault1000Selected = currency === '1000';
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
    this.createTradingAccForm = new FormGroup({
      currency: new FormControl(null, {
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        validators: [Validators.required]
      }),
      leverage: new FormControl(null, {
        validators: [Validators.required]
      }),
      additionalOptions: new FormControl(null) // Add this line if you want to include an additionalOptions form control
    } ),(
      {title: new FormControl(null)});
  }

  private dismissModal(done: boolean) {
    this.modalController.dismiss({
      data: done
    });
  }
}
