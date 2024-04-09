import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { PasswordConfirmationComponent } from 'src/app/shared/components/password-confirmation/password-confirmation.component';
import { DepositService } from 'src/app/shared/services/Deposit.service';
import { MainService } from 'src/app/shared/services/main.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Http, HttpResponse } from '@capacitor-community/http';


import { DataService } from 'src/app/shared/services/Data.service';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;
  private depositSubscription: Subscription;
  public currentDepositAmount: number = 0;
  public depositForm: FormGroup;
  public pspSolutions: Array<any>;
  public allPspSolutions: Array<any>;
  constructor(
    private _toastService: ToastService,
    private modalController: ModalController,
    private _mainService: MainService,
    private _authService: AuthService,
    private depositService: DepositService,
    private _Data:DataService
  ) { }


  card: any = {};

  ngOnInit() {
    this.getPaymentMethods();
    this.createForm();
    this.depositSubscription = this.depositService.getDepositAmount().subscribe((amount: number) => {
      this.currentDepositAmount = amount;
    });

    this.card = {
      cardNumber: "",
      cardholderName: "",
      cardSecurityCode: "",
      expiryMonth: "",
      expiryYear: ""
    };
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
// new modal 


  
public getCurrentTimestamp1(): number {
  return Math.floor(Date.now() / 1000);
}

public async proceedtoPraxis():Promise<void>{

const intent =  "payment"
const   cid = "CU699729"
const locale  = "en-GB"
const  currency  = this._authService.getCurrency
const amount  = "10"
const  customer_data= {
  "country":this._authService.getCurrency,
  "first_name": this._authService.getFirstName,
  "last_name": this._authService.getLastName,
  "dob": "02-14-2000",
  "email": this._authService.getEmail,
  "phone": this._authService.getContactNumber,
  "zip": "0000",
  "state": "default",
  "city": "default",
  "address": "default"
}

const  payment_method = null
const  gateway ="143f785df77d0bc790d9dfc3a68790bb"// from the psp company
const validation_url = null
const notification_url  = "https:\/\/api.merchant.com\/v1\/deposits\/tx-1560610955"
const  return_url = "https:\/\/merchant.com\/payment_result\/tx-1560610955"
const order_id  = "test-1560610955"
const  version = "1.3"

try {
  const httpResponse = await this._mainService.initiatePraxis1(
  
    intent,
    cid,
    locale,
    currency,
    amount,
    customer_data,
    payment_method,
    gateway,
    validation_url,
    notification_url,
    return_url,
    order_id,
    version,

  );

  // Assuming response.data has the structure: { timestamp: string, status: number, result: { id: string, redirectUrl: string } }

  const responseData = httpResponse.data;

  if(responseData && responseData.result && responseData.result.redirectUrl) {
    const redirectUrl = responseData.result.redirectUrl;
    window.open(redirectUrl, '_blank');
  } else {
    console.error('Redirect URL not found in the response data:', responseData);
  }

} catch (error) {
  console.error('HTTP request failed:', error);
}
  }

  public async proceedtoPaymaxis(): Promise<void> {


    const referenceId = 'payment_id=123;custom_ref=456';
    const paymentType = 'DEPOSIT';
    const paymentMethod = 'BASIC_CARD/Debit card';
    const amount = this.depositForm.get('amount').value;
    const description = 'Your deposit has been processed';
    const card = {
      cardNumber: this.depositForm.get('cardnumber').value,
      cardholderName:this.depositForm.get('cardname').value,
      cardSecurityCode: this.depositForm.get('cardcvv').value,
      expiryMonth: this.depositForm.get('cardexpiremonth').value,
      expiryYear: this.depositForm.get('cardexpireyear').value
    };
  
    const customer = {

      referenceId: "Default",
      
      citizenshipCountryCode:   this.depositForm.get('currency').value, 
      
      firstName: this._authService.getFirstName,
      
      lastName: this._authService.getLastName,
      
      email: this._authService.getEmail,
      
      phone: this._authService.getContactNumber
      
      };
  
    const billingAddress = {

      addressLine1: "default",
      
      addressLine2: "default",
      
      city: "default",
      
      countryCode: this.depositForm.get('currency').value,
      
      postalCode: "default",
      
      state: "default"
      
      };
  
    const currency = this._authService.getCurrency;
  
    try {
      const httpResponse = await this._mainService.initiatePaymaxis(
        referenceId, 
        paymentType, 
        paymentMethod, 
        amount, 
        currency, 
        description, 
        card, 
        customer, 
        billingAddress
      );
  
      // Assuming response.data has the structure: { timestamp: string, status: number, result: { id: string, redirectUrl: string } }
    
      const responseData = httpResponse.data;

      if(responseData && responseData.result && responseData.result.redirectUrl) {
        const redirectUrl = responseData.result.redirectUrl;
        window.open(redirectUrl, '_blank');
      } else {
        console.error('Redirect URL not found in the response data:', responseData);
      }
  
    } catch (error) {
      console.error('HTTP request failed:', error);
    }
  }

  


   

  public async proceedtoZota(): Promise<void> {
 const merchantOrderID= "920799a33d42011"// random number for any order 
 const merchantOrderDesc= "Default"
 const orderAmount= "1"// still testing 
 const orderCurrency= this._authService.getCurrency
 const customerEmail= this._authService.getEmail
 const  customerFirstName= this._authService.getFirstName
 const   customerLastName= this._authService.getLastName
 const   customerAddress= "Default"
 const   customerCountryCode= "ZA"
 const customerCity= "Default"
 const customerState= "Default"
 const customerZipCode= "Default"
 const  customerPhone= this._authService.getContactNumber
 const  customerBankCode= "BBL"// default bank code 
 const  customerIP= "134.201.250.130"// default customer IP
 const redirectUrl= "https://www.example-merchant.com/payment-return/"
 const  callbackUrl= "https://www.example-merchant.com/payment-callback/"
 const  customParam= "{\"UserId\": \"c75b72ed\"}"//deafult  customParam
 const checkoutUrl= "https://www.example-merchant.com/account/deposit/?uid=c75b72ed"
 const signature = this._mainService.createSignature(merchantOrderID, orderAmount, customerEmail);
 console.log('Signature:', signature);
    try {
      const httpResponse = await this._mainService.initiateZotapay(
        merchantOrderID,
        merchantOrderDesc,
        orderAmount,
        orderCurrency,
        customerEmail,
        customerFirstName,
        customerLastName,
        customerCountryCode,
        customerPhone,
        customerIP,
        redirectUrl,
        callbackUrl,
        customerBankCode,
        customerAddress,
        customerCity,
        customerState,
        customerZipCode,
        customParam,
        checkoutUrl,
        signature
      );

      const responseData = httpResponse.data;
      if(responseData && responseData.data && responseData.data.depositUrl) {
        const redirectUrl = responseData.data.depositUrl;
        window.open(redirectUrl, '_blank');
      } else {
        console.error('Redirect URL not found in the response data:', responseData);
      }
      
    } catch (error) {
      console.error('HTTP request failed:', error);
    }
  }
  private proceedToOzow ():void {
    const SiteCode="1ST-1ST-002"
    const   CountryCode="ZA"// default code
    const CurrencyCode="ZAR"// default code 
    const  Amount=this.depositForm.get('amount').value;
    const   TransactionReference="Test"
    const  BankReference="Test"
    const  CancelUrl="https://api.dev.fasta.co.za/eft/cancel"
    const  ErrorUrl= "https://api.dev.fasta.co.za/eft/error"
    const  SuccessUrl="https://api.dev.fasta.co.za/eft/success"
    const   NotifyUrl="http://test.i-pay.co.za/responsetest.php"
    const  IsTest= false 
    const PrivateKey = "55tn9wyZ4SCjF6EUOWFwKbi7LV2pFdPW"; 

    const inputString = `${SiteCode}${CountryCode}${CurrencyCode}${Amount}${TransactionReference}${BankReference}${CancelUrl}${ErrorUrl}${SuccessUrl}${NotifyUrl}${IsTest}${PrivateKey}`;
  const HashCheck = this._mainService.getSha512Hash(inputString.toLowerCase());

        const payURL = this._mainService.initiateOzowPayment1(
SiteCode,
CountryCode,
CurrencyCode,
Amount,
TransactionReference,
BankReference,
CancelUrl,
ErrorUrl,
SuccessUrl,
NotifyUrl,
IsTest,
HashCheck
        )
          
        console.log('PayFast URL:', payURL);
        window.open(payURL, '_blank');
      }
    
  
  
  private proceedToPayFast(): void {
    console.log('proceedToPayFast called');

    const itemName = 'Test Item';
    const itemDescription = 'Test Item Description';
    const amount = this.depositForm.get('amount').value;
    const returnUrl = 'https://yourwebsite.com/payment_success';
    const cancelUrl = 'https://yourwebsite.com/payment_cancel';
    const notifyUrl = 'https://yourwebsite.com/payment_notify';
  
    const payFastUrl = this._mainService.initiatePayFastPayment(
      itemName,
      itemDescription,
      amount,
      returnUrl,
      cancelUrl,
      notifyUrl
    );
  
    console.log('PayFast URL:', payFastUrl);
    window.open(payFastUrl, '_blank');
  }


  public async onSubmit(): Promise<void> {
    if (!this.depositForm.valid) {
      this._toastService.presentToast('Please complete the form', 'toast-warning');
      return;
    }
  
    const passwordCheck: boolean = await this.confirmPassword();
    if (passwordCheck) {
      const selectedPaymentMethod = this.depositForm.get('paymentMethod').value;
  
      const paymentMethod = this.pspSolutions.find(solution => solution.name === selectedPaymentMethod);
  
      if (paymentMethod) {
        const paymentHandlers = {
            'Payfast': () => this.proceedToPayFast(),
            'Ozow': () => this.proceedToOzow(),
            'Zotapay': () => this.proceedtoZota(),
            'Paymaxis': () => this.proceedtoPaymaxis(),
            'Praxis': () => this.proceedtoPraxis(),
        };

        const paymentHandler = paymentHandlers[paymentMethod.name];
        if (paymentHandler) {
            paymentHandler();
        } else {
            // Handle unknown payment method
        }
    }


      const amount = this.depositForm.get('amount').value;
      this.depositService.setDepositAmount(this.currentDepositAmount + amount);
  

      const currency = this.depositForm.get('currency').value;
      const ccIdRes = await this._mainService.getCreditCards().then();
      const ccId = ccIdRes['cc_id'];
  
      this._mainService.createDeposit(2, ccId, amount, currency)
        .then(res => {
          if (res.success) {
            this._toastService.presentToast('Deposit successfully completed', 'success');
            this.depositForm.reset();
            this.dismissModal();
          } else {
            this._toastService.presentToast(res.info.message, 'toast-warning');
          }
        })
        .catch(err => {
          console.log('error: ', err);
        });
  
    } else {
      this._toastService.presentToast('Incorrect password.', 'toast-warning');
    }
  }
  
  

  public onProceed(): void {
    this._toastService.presentToast('User directed to payment provider.', 'success');
  }


  private createForm(): void {
    this.depositForm = new FormGroup({
      currency: new FormControl(null, {
        validators: [Validators.required]
      }),
      amount: new FormControl(null, {
        validators: [Validators.required]
      }),
      paymentMethod: new FormControl(null, {
        validators: [Validators.required]
      }),
      cardnumber : new FormControl(),
      cardname: new FormControl(),
      cardcvv: new FormControl(),
      cardexpiremonth: new FormControl(),
      cardexpireyear: new FormControl()
    });
  };

  private async confirmPassword(): Promise<boolean> {
    const modal = await this.modalController.create({
      component: PasswordConfirmationComponent,
      cssClass: 'my-custom-class'
    });
    await modal.present();

    return modal.onDidDismiss().then((res) => res.data.data);
  }

  public onCurrencyChange(): void {
    const selectedCurrency = this.depositForm.get('currency').value;

    if (selectedCurrency === 'ZAR') {
      this.pspSolutions = this.allPspSolutions.filter(
        (solution) => solution.name === 'Payfast' || solution.name === 'Ozow' ||  solution.name ==='Paymaxis' ||  solution.name ==='Praxis' 
      );
    }else if (selectedCurrency === 'Nigeria') {
        this.pspSolutions = this.allPspSolutions.filter(
          (solution) =>   solution.name === 'Paymaxis'|| solution.name === 'Mpesa' || solution.name === 'Zotapay'
        );
         } else if (selectedCurrency === 'Tanzania') {
          this.pspSolutions = this.allPspSolutions.filter(
            (solution) =>   solution.name ==='Zotapay' || solution.name === 'Paymaxis'|| solution.name === 'Mpesa' || solution.name === 'Airtel'|| solution.name === 'Ticopesa'||solution.name === 'Praxis'
          );
        } else if (selectedCurrency === 'Botswana') {
          this.pspSolutions = this.allPspSolutions.filter(
            (solution) =>   solution.name === 'Zotapay'|| solution.name === 'Mpesa' || solution.name === 'Airtel'|| solution.name === 'Ticopesa' || solution.name === 'Wire-transfer'
          );
        
        
      
    }else{
      this.pspSolutions = this.allPspSolutions;
    }
  }



  public getPaymentMethods(): void {
    this._mainService.getPaymentMethods()
      .then(res => {
        const solutions = res;
        const userCountry = this._authService.getCountry;

        this.allPspSolutions = solutions[userCountry];
        this.pspSolutions = this.allPspSolutions;
        this.pspSolutions.forEach(solution => {
          console.log('Currency:', solution.currency);
        });
  
        console.log('allPspSolutions: ', JSON.stringify(this.allPspSolutions));
      })
      .catch(err => {
        console.log(err);
      });
  }

  private dismissModal() {
    this.modalController.dismiss({
      data: 'deposit'
    });
  }

}
