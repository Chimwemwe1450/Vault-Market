import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../../app/auth/shared/services/auth.service';
import { LoaderService } from './loader.service';
import { GenericService } from './generic.service';
import { Http, HttpResponse } from '@capacitor-community/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { TradingAccount } from '../models/trading-account.model';
import { Wallet } from '../models/wallet.model';
import { IApiResponse } from '../interfaces/api-response';
import { BankAccount } from '../models/bank-account.model';
import { UserTransaction } from '../models/user-transaction.model';
import { Leverage } from '../models/leverage.model';
import { Country } from '../models/country.model';
import { ewallet } from '../models/Ewallet.model';
import { EventEmitter } from '@angular/core';
import { Newbank } from '../models/newbank.model';
import * as crypto from 'crypto-js';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class MainService extends GenericService {
  avatarChange = new EventEmitter<string>();

  public newbank: Array<Newbank>;
  public ewallet: Array<ewallet>;
  public tradingAccounts: Array<TradingAccount>;
  public walletAccounts: Array<Wallet>;
  public bankAccounts: Array<BankAccount>;
  public creditCards: Array<any>;
  public userTransactions: Array<UserTransaction>;
  public allCountries: Array<Country>;
  public allCurrencies: Array<any>;
  public allLeverages: Array<Leverage>;

  public userNameSubject = new BehaviorSubject('');
  public balanceSubject = new BehaviorSubject('');
  public currentTradingAccSubject = new BehaviorSubject<TradingAccount>(
    undefined
  );
  public tradingAccountsSubject = new BehaviorSubject<Array<TradingAccount>>(
    undefined
  );

  private apiBaseUrl = environment.baseUrl;

  public api = 'https://yourendpoint.com/gateway/api/5/syntellicore.cfc?';

  private apiUrl =
    'https://yourendpoint.com/gateway/api/5/syntellicore.cfc?method=create_ewallet';
  private apiKey = 'f0933a23-744e-49f5-be8b-12c29b19d5dd';

  private payfastApiUrl = 'https://www.payfast.co.za/eng/process';
  private payfastMerchantId = '20039131';
  private payfastMerchantKey = 'pji54asxsmtoo';

  private URL = 'https://pay.ozow.com/';
  private ozowApiKey = 'f9V4hboj4ebbR1QW0YXRLGpm980craSq';
  private ozowSiteCode = '1ST1ST002';
  private paymentRequestId = 'e62ba8e0-d237-4100-8ac9-c491e95bbb7b';
  //
  private Zotamerchant_id = 'VAULTMARKETS';
  private ZotaMerchantSecretKey = '37c27ae0-afcd-4df2-b1e6-9cb820bc59f6';
  private merchantSecretKey = '37c27ae0-afcd-4df2-b1e6-9cb820bc59f6';
  private ZotaURL = 'https://api.zotapay.com/api/v1/deposit/request/408963';
  constructor(
    private _authService: AuthService,
    public _loaderService: LoaderService,
    private http: HttpClient
  ) {
    super(_loaderService);
  }

  getSha512Hash(stringToHash: string): string {
    return crypto.SHA512(stringToHash).toString();
  }

  //  missng new update
  public async createWithdrawalRequest(
    currency: string,
    amount: string,
    methodId: string,
    methodType: string
  ): Promise<any> {
    let queryString = `${this.apiBaseUrl}method=create_withdrawal_request&user=${this._authService.getUser}&access_token=${this._authService.getToken}&currency=${currency}&amount=${amount}&method_id=${methodId}&method_type=${methodType}`;
    let headers = {
      api_key: '29554993-1B65-4A5F-825F-E71484B82E9B',
    };
    return this.http.post(queryString, null, { headers }).toPromise();
  }
  public create_ewallet(
    owner_name: string,
    ewallet_type: string,
    wallet_address: string,
    billing_email: string,
    billing_address: string,
    billing_city: string,
    billing_country: string,
    billing_province: string,
    billing_zip: string,
    billing_tel_country_code: string,
    billing_tel: string
  ): Promise<any> {
    let queryString = `${this.apiBaseUrl}method=create_ewallet`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString = queryString + `&owner_name=${owner_name}`;
    queryString = queryString + `&ewallet_type=${ewallet_type}`;
    queryString = queryString + `&wallet_address=${wallet_address}`;
    queryString = queryString + `&billing_email=${billing_email}`;
    queryString = queryString + `&billing_address=${billing_address}`;
    queryString = queryString + `&billing_city=${billing_city}`;
    queryString = queryString + `&billing_country=${billing_country}`;
    queryString = queryString + `&billing_province=${billing_province}`;
    queryString = queryString + `&billing_zip=${billing_zip}`;
    queryString =
      queryString + `&billing_tel_country_code=${billing_tel_country_code}`;
    queryString = queryString + `&billing_tel=${billing_tel}`;

    return this.post(queryString);
  }

  public async userProfileImageUpload(file: File): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=user_profile_image_upload`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString = queryString + `&file=${file.name}`;

    return this.post(queryString);
  }

  public async create_bank_account(
    beneficiary_fname: string,
    beneficiary_lname: string,
    address: string,
    country: string,
    province: string,
    zip_code: string,
    bank_name: string,
    bank_address: string,
    bank_country: string,
    bank_province: string,
    bank_zip_code: string,
    bank_account_no: string,
    swift_code: string,
    bank_branch: string,
    currency_id: string,
    bank_branch_code: string
  ): Promise<any> {
    let queryString = `${this.apiBaseUrl}method=create_bank_account`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString = queryString + `&beneficiary_fname=${beneficiary_fname}`;
    queryString = queryString + `&beneficiary_lname=${beneficiary_lname}`;
    queryString = queryString + `&address=${address}`;
    queryString = queryString + `&country=${country}`;
    queryString = queryString + `&province=${province}`;
    queryString = queryString + `&zip_code=${zip_code}`;
    queryString = queryString + `&bank_name=${bank_name}`;
    queryString = queryString + `&bank_address=${bank_address}`;
    queryString = queryString + `&bank_country=${bank_country}`;
    queryString = queryString + `&bank_province=${bank_province}`;
    queryString = queryString + `&bank_zip_code=${bank_zip_code}`;
    queryString = queryString + `&bank_account_no=${bank_account_no}`;
    queryString = queryString + `&swift_code=${swift_code}`;
    queryString = queryString + `&bank_branch=${bank_branch}`;
    queryString = queryString + `&currency_id=${currency_id}`;
    queryString = queryString + `&bank_branch_code=${bank_branch_code}`;

    return this.post(queryString);
  }
  
// praxis 
private  INTENT_PAYMENT = 'payment';
  private  MERCHANT_ID = 'API-VaultMarkets';
  private  MERCHANT_SECRET = 'nlHm7gzY9iyY6DQFsPdvNpVZ3OVF5Iqn';
  private  APPLICATION_KEY = 'vault-markets.com';
  private  API_VERSION = '1.3';



  getSampleDataToSendRequest() {
    const request = {
      cid: 'CU699729',
      application_key: this.APPLICATION_KEY,
      merchant_id: this.MERCHANT_ID,
      intent: this.INTENT_PAYMENT,
      order_id: this.getOrderID(),
      timestamp: this.getCurrentTimestamp(),
      version: this.API_VERSION
    };
  
    return request;
  }
  
  
  private getRequestSignatureList() {
    return [
      'merchant_id',
      'application_key',
      'timestamp',
      'intent',
      'cid',
      'order_id',
    ];
  }
  
  private getConcatenatedString(data: any): string {
    let concatenated_string = '';
    for (let key of this.getRequestSignatureList()) {
      if (key in data && data[key] !== null) {
        concatenated_string += data[key];
      }
    }
  
    return concatenated_string;
  }
  
  getGtAuthenticationHeader(request: any): string {
    const concatenated_string = this.getConcatenatedString(request);
  
    // Concatenate Merchant Secret Key with response params
    const signature_input = concatenated_string + this.MERCHANT_SECRET;
  
    // Generate HASH of concatenated string
    const signature = this.generateSignature(signature_input);
    return signature;
  }
  
  private generateSignature(input: string): string {
    const hash = CryptoJS.SHA384(input);
    return hash.toString(CryptoJS.enc.Hex);
  }
  
  private getOrderID(): string {
    return 'order_' + Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
  }
  
  private getCurrentTimestamp(): number {
    return Math.floor(new Date().getTime() / 1000);
   
  }
  
  testSignature() {
    console.log("=== TESTING REQUEST TO BE SENT ====");
    const request_to_send = this.getSampleDataToSendRequest();
    const gt_authentication_header = this.getGtAuthenticationHeader(request_to_send);
    const request_to_send_json_string = JSON.stringify(request_to_send);
    console.log('== GT-Authentication header in the request:');
    console.log(gt_authentication_header);
    console.log('== data to send:');
    console.log(request_to_send_json_string);
  }
  
  public async initiatePraxis1(
 
   
    intent:string,
    cid:string,
    locale:string,
    currency : string ,
    amount: string ,
    customer_data:any ,
    payment_method:string,
    gateway:string,
    validation_url:string,
    notification_url:string,
    return_url:string,
    order_id:string,
    version :string,
  
      ): Promise<HttpResponse> {
        const request = this.getSampleDataToSendRequest();
        const gtAuthenticationHeader = this.getGtAuthenticationHeader(request);
  
    const bodyObject = {
     
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

  
      ...request
    };

    const headers = {
      'Content-Type': 'application/json',
      'GT-Authentication': gtAuthenticationHeader
    };

    const response = await Http.request({
      method: 'POST',
      url: 'https://gw.praxisgate.com/api/direct-process',
      headers: headers,
      data: bodyObject,
    });

    return response;
  }

  // Psp integreation

  createSignature(
    merchantOrderID: string,
    orderAmount: string,
    customerEmail: string
  ): string {
    const stringToSign =
      408963 +
      merchantOrderID +
      orderAmount +
      customerEmail +
      this.merchantSecretKey;
    const hash = crypto.SHA256(stringToSign);
    const signature = hash.toString(crypto.enc.Hex);
    return signature;
  }

  public async initiateZotapay(
    merchantOrderID: string,
    merchantOrderDesc: string,
    orderAmount: string,
    orderCurrency: string,
    customerEmail: string,
    customerFirstName: string,
    customerLastName: string,
    customerCountryCode: string,
    customerPhone: string,
    customerIP: string,
    redirectUrl: string,
    callbackUrl: string,
    customerBankCode: string,
    customerAddress: string,
    customerCity: string,
    customerState: string,
    customerZipCode: string,
    customParam: string,
    checkoutUrl: string,
    signature: string
  ): Promise<HttpResponse> {
    const bodyObject = {
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
      signature,
    };

    const options = {
      url: 'https://api.zotapay.com/api/v1/deposit/request/408962',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: bodyObject,
    };

    return Http.request(options);
  }

  public async initiatePaymaxis(
    referenceId: string,
    paymentType: string,
    paymentMethod: string,
    amount: number,
    currency: string,
    description: string,
    card: any,
    customer: any,
    billingAddress: any
  ): Promise<HttpResponse> {
    const bodyObject = {
      referenceId,
      paymentType,
      paymentMethod,
      amount,
      currency,
      description,
      card,
      customer,
      billingAddress,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer dNqx97cyQUZXIqsvOHBXW9ajL1Plq0nz`,
      'Signing key': 'hkQGczmJH2HW',
    };

    const response = await Http.request({
      method: 'POST',
      url: 'https://app.paymaxis.com/api/v1/payments',
      headers: headers,
      data: bodyObject,
    });

    return response;
  }

  // Payfast Merchant Intergration
  public initiatePayFastPayment(
    itemName: string,
    itemDescription: string,
    amount: number,
    returnUrl: string,
    cancelUrl: string,
    notifyUrl: string
  ): string {
    const queryParams = new URLSearchParams({
      merchant_id: this.payfastMerchantId,
      merchant_key: this.payfastMerchantKey,
      item_name: itemName,
      item_description: itemDescription,
      amount: amount.toFixed(2),
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
    });

    return `${this.payfastApiUrl}?${queryParams.toString()}`;
  }

  // Ozow Intergration

  public initiateOzowPayment1(
    SiteCode: string,
    CountryCode: string,
    CurrencyCode: string,
    Amount: number,
    TransactionReference: string,
    BankReference: string,
    CancelUrl: string,
    ErrorUrl: string,
    SuccessUrl: string,
    NotifyUrl: string,
    IsTest: boolean,
    Hashcheck: string
  ): string {
    const queryParams = new URLSearchParams({
      Apikey: this.ozowApiKey,
      SiteCode: SiteCode,
      CountryCode: CountryCode,
      CurrencyCode: CurrencyCode,
      Amount: Amount.toString(),
      TransactionReference: TransactionReference,
      BankReference: BankReference,
      CancelUrl: CancelUrl,
      ErrorUrl: ErrorUrl,
      SuccessUrl: SuccessUrl,
      NotifyUrl: NotifyUrl,
      IsTest: IsTest.toString(),
      Hashcheck: Hashcheck,
    });

    return `${this.URL}?${queryParams.toString()}`;
  }

  // Sytellicore API  this section includes  user upload and get  create

  // section for  user upload image

  public async;
  // section for get

  public async getUserPendingWithdrawals(): Promise<Array<any>> {
    const response = await this.post(
      `${this.apiBaseUrl}method=get_user_pending_withdrawals&user=${this._authService.getUser}&access_token=${this._authService.getToken}`
    );

    if (response.success) {
      return response.data;
    } else {
      return [];
    }
  }

  public async getWallets(): Promise<Array<Wallet>> {
    if (this.walletAccounts) {
      return this.walletAccounts;
    } else {
      const response = await this.post(
        `${this.apiBaseUrl}method=get_user_wallets&user=${this._authService.getUser}&access_token=${this._authService.getToken}`
      );

      if (response.success) {
        this.walletAccounts = response['data'];
        const balance = response['data'][0]['balance_formatted'];
        this.balanceSubject.next(balance);
      }

      return this.walletAccounts;
    }
  }

  public async getTradingAccounts(): Promise<Array<TradingAccount>> {
    if (this.tradingAccounts) {
      return this.tradingAccounts;
    } else {
      const response: IApiResponse = await this.post(
        `${this.apiBaseUrl}method=get_trading_accounts&user=${this._authService.getUser}&access_token=${this._authService.getToken}`
      );

      if (response.success) {
        this.tradingAccounts = response.data;
      }

      return this.tradingAccounts;
    }
  }

  public async getBankAccounts(): Promise<Array<BankAccount>> {
    if (this.bankAccounts) {
      return this.bankAccounts;
    } else {
      const response: IApiResponse = await this.post(
        `${this.apiBaseUrl}method=get_user_bankaccounts&user=${this._authService.getUser}&access_token=${this._authService.getToken}`
      );

      if (response.success) {
        this.bankAccounts = response.data;
      }

      return this.bankAccounts;
    }
  }

  public async getCreditCards(): Promise<Array<any>> {
    if (this.creditCards) {
      return this.creditCards;
    } else {
      const response = await this.post(
        `${this.apiBaseUrl}method=get_user_creditcards&user=${this._authService.getUser}&access_token=${this._authService.getToken}`
      );

      if (response.success) {
        this.creditCards = response.data;
      }

      return this.creditCards;
    }
  }

  public async getUserTransactions(
    from: string,
    to: string,
    update: boolean
  ): Promise<Array<UserTransaction>> {
    if (update || !this.userTransactions) {
      const query = `method=get_user_transactions&user=${this._authService.getUser}&access_token=${this._authService.getToken}`;
      const response = await this.post(
        `${this.apiBaseUrl}${query}&from_dt=${from}&to_dt=${to}`
      );

      if (response.success) {
        this.userTransactions = response.data;
      }

      return this.userTransactions;
    } else {
      return this.userTransactions;
    }
  }

  public async getCountries(): Promise<Array<Country>> {
    if (this.allCountries) {
      return this.allCountries;
    } else {
      const response = await this.post(
        `${this.apiBaseUrl}method=get_countries`
      );

      if (response.success) {
        this.allCountries = response.data;
      }

      return this.allCountries;
    }
  }

  public async getCurrencies(): Promise<Array<any>> {
    if (this.allCurrencies) {
      return this.allCurrencies;
    } else {
      const response = await this.post(
        `${this.apiBaseUrl}method=get_currencies`
      );

      if (response.success) {
        this.allCurrencies = response.data;
      }

      return this.allCurrencies;
    }
  }

  public async getLeverage(): Promise<Array<Leverage>> {
    if (this.allLeverages) {
      return this.allLeverages;
    } else {
      const response = await this.post(
        `${this.apiBaseUrl}method=get_leverage&user=${this._authService.getUser}&access_token=${this._authService.getToken}`
      );

      if (response.success) {
        this.allLeverages = response.data;
      }

      return this.allLeverages;
    }
  }

  // section for create

  public async createWithdrawal(
    currency: string,
    amount: number,
    method_id: number,
    method_type: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=create_withdrawal_request`;
    queryString += `&user=${this._authService.getUser}`;
    queryString += `&access_token=${this._authService.getToken}`;
    queryString += `&currency=${currency}&amount=${amount}`;
    queryString += `&method_id=${method_id}&method_type=${method_type}`;

    this.bankAccounts = undefined;
    const response = await this.post(queryString);
    return response;
  }

  public async userProfileImageUpload1(file: File): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=user_profile_image_upload`;
    queryString += `&user=${this._authService.getUser}`;
    queryString += `&access_token=${this._authService.getToken}`;

    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.post(queryString, formData).toPromise();
    return response as IApiResponse;
  }

  public async createEwallet(
    ownerName: string,
    ewalletType: number,
    walletAddress: string,
    billingEmail: string,
    billingAddress: string,
    billingCity: string,
    billingCountry: number,
    billingProvince: string,
    billingZip: string,
    billingTelCountryCode: string,
    billingTel: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=create_ewallet`;
    queryString += `&user=${this._authService.getUser}`;
    queryString += `&access_token=${this._authService.getToken}`;
    queryString += `&owner_name=${ownerName}&ewallet_type=${ewalletType}&wallet_address=${walletAddress}`;
    queryString += `&billing_email=${billingEmail}&billing_address=${billingAddress}&billing_city=${billingCity}`;
    queryString += `&billing_country=${billingCountry}&billing_province=${billingProvince}&billing_zip=${billingZip}`;
    queryString += `&billing_tel_country_code=${billingTelCountryCode}&billing_tel=${billingTel}`;

    this.ewallet = undefined;

    const response = await this.post(queryString);
    return response;
  }

  public async createBankAccount(
    beneficiaryFname: string,
    beneficiaryLname: string,
    address: string,
    country: number,
    province: string,
    zipCode: string,
    bankName: string,
    bankAddress: string,
    bankCountry: number,
    bankProvince: string,
    bankZipCode: string,
    bankAccountNo: string,
    swiftCode: string,
    bankBranch: string,
    currencyId: string,
    bankBranchCode: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=create_bank_account`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString =
      queryString +
      `&beneficiary_fname=${beneficiaryFname}&beneficiary_lname=${beneficiaryLname}&address=${address}`;
    queryString =
      queryString +
      `&country=${country}&province=${province}&zip_code=${zipCode}`;
    queryString =
      queryString +
      `&bank_name=${bankName}&bank_address=${bankAddress}&bank_country=${bankCountry}`;
    queryString =
      queryString +
      `&bank_province=${bankProvince}&bank_zip_code=${bankZipCode}&bank_account_no=${bankAccountNo}`;
    queryString =
      queryString +
      `&swift_code=${swiftCode}&bank_branch=${bankBranch}&currency_id=${currencyId}&bank_branch_code=${bankBranchCode}`;

    this.bankAccounts = undefined;
    const response = await this.post(queryString);
    return response;
  }

  public async createInternalTransfer(
    from: string | number,
    to: string | number,
    atId: number,
    amount: number,
    currency: string,
    itToken: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=create_internal_transfer`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString =
      queryString +
      `&source=${from}&destination=${to}&at_id=${atId}&amount=${amount}&currency=${currency}&it_token=${itToken}`;

    this.tradingAccounts = undefined;

    return await this.post(queryString);
  }

  public async createDeposit(
    txsId: number,
    ccId: number,
    amount: number,
    currency: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=create_deposit`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString =
      queryString +
      `&txs_id=${txsId}&cc_id=${ccId}&amount=${amount}&currency=${currency}`;

    this.walletAccounts = undefined;

    return this.post(queryString);
  }

  public async createTradingAccount(
    leverage: string,
    sToken: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=create_trading_account`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString =
      queryString +
      `&type=real&leverage=${leverage}&eq_group_id=91&stoken=${sToken}`;

    this.tradingAccounts = undefined;

    return this.post(queryString);
  }

  public async createLeverageRequest(
    tradingAccountId: string,
    leverageId: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=create_account_leverage_request`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString =
      queryString + `&account_id=${tradingAccountId}&leverage_id=${leverageId}`;

    this.tradingAccounts = undefined;

    return this.post(queryString);
  }

  public async getDialingCodes(): Promise<any> {
    return fetch('../../../assets/dial-codes.json').then((res) => res.json());
  }

  public async getPaymentMethods(): Promise<any> {
    return fetch('../../../assets/payment-solutions.json').then((res) =>
      res.json()
    );
  }

  public async changeTradingPassword(
    tradingAccountId: string,
    password: string
  ): Promise<IApiResponse> {
    let queryString = `${this.apiBaseUrl}method=set_trading_account_password`;
    queryString = queryString + `&user=${this._authService.getUser}`;
    queryString = queryString + `&access_token=${this._authService.getToken}`;
    queryString =
      queryString +
      `&account_id=${tradingAccountId}&account_type=real&password_new=${password}&reset_password=1`;

    return this.post(queryString);
  }

  public async refreshTradingAccounts(): Promise<void> {
    await this.getTradingAccounts()
      .then((res) => {
        this.tradingAccounts = res;
        this.tradingAccountsSubject.next(this.tradingAccounts);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  public getCurrentTradingAccount(): TradingAccount {
    const accId = this._authService.getTradingAccountId;

    if (!accId) {
      return undefined;
    }
    // Converting the string id to number for comparison
    // does not produce a true number, so conversion fails.
    // I have to do all this then.
    const replaced = accId.replace(/\D/g, '');
    const convertedId = Number(replaced);
    const currentAccount = this.tradingAccounts.find((i) => {
      return i.account_id === convertedId;
    });

    return currentAccount;
  }

  public pushCurrentTradingAccount(account: TradingAccount): void {
    this.currentTradingAccSubject.next(account);
  }
}
