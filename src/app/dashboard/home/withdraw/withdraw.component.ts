import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MainService } from 'src/app/shared/services/main.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { BankAccount } from 'src/app/shared/models/bank-account.model';
import { Account } from 'src/app/shared/models/selected-account.model';
import { DepositService } from 'src/app/shared/services/Deposit.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
class SelectedAccounts {
  from: Account = new Account();
  to: Account = new Account();
}



@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;

  private depositSubscription: Subscription;
  public currentDepositAmount: number = 0;



  public withdrawForm: FormGroup;
  public selectedAccounts: SelectedAccounts = new SelectedAccounts();

  public bankAccData: Array<BankAccount> = [];
  public displayWithdrawTable = false;
  public withdrawalData: Array<any> = [];
  public selectedBankAccount: BankAccount;


  constructor(
    private _toastService: ToastService,
    private _mainService: MainService,
    private depositService: DepositService,
    private  AuthService: AuthService  ,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getWithdrawalData();
      this.depositSubscription = this.depositService.getDepositAmount().subscribe((amount: number) => {
      this.currentDepositAmount = amount;
    });
    this.withdrawForm.get('currency').patchValue(this.AuthService.getCurrency);
  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.ontouchmove = (e) => {
      e.stopPropagation();
    };
  }
  ngOnDestroy() {
    if (this.depositSubscription) {
      this.depositSubscription.unsubscribe();
    }
  }



public onSelectChange(selectedBankAccount: BankAccount): void {
  this.selectedBankAccount = selectedBankAccount;
}

  public getWithdrawalData(): void {

    this._mainService.getUserPendingWithdrawals().then((data) => {
console.log({data})
      this.withdrawalData = data
    })
  }

  

  public withdrawRequest(): void {
    const amount = this.withdrawForm.get('amount').value;
    if (amount) {
      this.getBankAccounts();
      this.displayWithdrawTable = true;
    } else {
      this._toastService.presentToast('Enter an amount', 'toast-warning');
    }
    const account = this.withdrawForm.get('account').value;
    if (account) {
      this.getBankAccounts();
      this.displayWithdrawTable = true;
    } 

  }

  Onsubmit(){
    const method_id = this.withdrawForm.get('account').value;
console.log(JSON.stringify(method_id) )


  }


  public async onWithdrawSubmit(): Promise<void> {

    if (!this.withdrawForm.valid) {
      this._toastService.presentToast('Form is not valid', 'toast-warning');
      return;
    }

    const currency = this.withdrawForm.get('currency').value; // replace with actual currency
    const amount = this.withdrawForm.get('amount').value
    const method_id = this.withdrawForm.get('account').value;
    const method_type = 'BANK';  // replace with actual method_type


    try {
      const response = await this._mainService.createWithdrawal(currency, amount, method_id, method_type);
      console.log(JSON.stringify(response));
      // handle response as needed
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  

  private getBankAccounts(): void {
    this._mainService.getBankAccounts()
      .then(res => {
        this.bankAccData = res;
        console.log('this is the getBankAccounts() ' ,JSON.stringify(res))
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  private createForm(): void {
    this.withdrawForm = new FormGroup({
      amount: new FormControl(null),
      account: new FormControl(null)
    });
}
}
