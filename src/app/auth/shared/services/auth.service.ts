import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FormGroup } from '@angular/forms';

import { Login } from '../models/login.model';
import { Registration } from '../models/registration.model';
import { AuthDetails } from '../models/auth-details.model';
import { Profile } from '../../../shared/models/profile.model';
import { IApiResponse } from 'src/app/shared/interfaces/api-response';

import { environment } from 'src/environments/environment';

import { GenericService } from 'src/app/shared/services/generic.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { BuildExtendedValues } from 'src/app/shared/helper-classes/build-extended-values';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService {

  public userData: Profile;
  public userDataSubject = new BehaviorSubject<Profile>(undefined);

  private apiBaseUrl = environment.baseUrl;
  private authToken: string;
  private user: string;

  constructor(
    private _storageService: StorageService,
    public _loaderService: LoaderService
  ) {
    super(_loaderService);
  }

  get getToken(): string {
    this.authToken = this._storageService.getUserPreference<string>('token');
    return this.authToken;
  }

  get getUser(): string {
    this.user = this._storageService.getUserPreference<string>('userId');
    return this.user;
  }

  get getFirstName(): string {
    const firstName = this._storageService.getUserPreference<string>('firstName');
    return firstName;
  }

  get getLastName(): string {
    const lastName = this._storageService.getUserPreference<string>('lastName');
    return lastName;
  }

  get getEmail(): string {
    const email = this._storageService.getUserPreference<string>('email');
    return email;
  }

  get getContactNumber(): string {
    const tel = this._storageService.getUserPreference<string>('tel1');
    const code = this._storageService.getUserPreference<string>('tel1_country_code');
    const contactNumber = `${code}${tel}`;
    return contactNumber;
  }



  get getCurrency(): string {
    const currency = this._storageService.getUserPreference<string>('currency');
    return currency;
  }

  get getCountry(): string {
    const country = this._storageService.getUserPreference<string>('country');
    return country;
  }

  get getTradingAccountId(): string {
    const acc = this._storageService.getUserPreference<string>('tradingAccount');
    return acc;
  }

  set setTradingAccountId(id: string) {
    this._storageService.setUserPreference('tradingAccount', JSON.stringify(id));
  }

  set setToken(token: string) {
    this._storageService.setUserPreference('token', token);
  }

  set setAuthData(data: AuthDetails) {
    this._storageService.setUserPreference('userId', data.user);
    this._storageService.setUserPreference('token', data.authentication_token);
    this._storageService.setUserPreference('password', data.password);
    this._storageService.setUserPreference('email', data.email);
  }

  set setUserData(data: Profile) {
    this._storageService.setUserPreference('firstName', data.fname);
    this._storageService.setUserPreference('lastName', data.lname);
    this._storageService.setUserPreference('currency', data.currency);
    this._storageService.setUserPreference('country', data.countryName);
  }

  public isAuthenticated(): boolean {
    this.authToken = this.getToken;
    if (this.authToken) {
      return true;
    } else {
      return false;
    }
  }

  public async logIn(loginData: Login): Promise<IApiResponse> {

    return await this.post(
      `${this.apiBaseUrl}method=user_login&email=${loginData.email}&password=${loginData.password}&brand_id=1`
    );
  }

  public async logOut(): Promise<IApiResponse> {

    return await this.post(
      `${this.apiBaseUrl}method=user_logout&user=${this.getUser}&access_token=${this.getToken}`
    );
  }

  public async register(registerData: Registration): Promise<IApiResponse> {
    const queryString = this.queryStringBuilder(registerData, 'create_user');

    return await this.post(
      queryString
    );
  }

  public async resetPassword(email: string): Promise<IApiResponse> {

    return await this.post(
      `${this.apiBaseUrl}method=get_password_reset_link&email=${email}`
    );
  }

  public async setPassword(password: string): Promise<IApiResponse> {

    return await this.post(
      `${this.apiBaseUrl}method=set_user_password&password=${password}`
    );
  }

  public async getAuthToken(): Promise<IApiResponse> {

    return await this.post(
      `${this.apiBaseUrl}method=get_token&user=${this.getUser}&access_token=${this.getToken}`
    );
  }

  public async checkToken(): Promise<boolean> {
    const response = await this.post(
      `${this.apiBaseUrl}method=user_authenticate&user=${this.getUser}&access_token=${this.getToken}`
    );
    return response['success'];
  }

  public async getUserData(): Promise<Profile> {

    if (this.userData) {
      return this.userData;
    }
    else {
      const response = await this.post(
        `${this.apiBaseUrl}method=get_users&user=${this.getUser}&access_token=${this.getToken}`
      );

      if (response['success']) {
        const data = response['data'][0];
        this.userData = {...data};

        this.userDataSubject.next(this.userData);
        this.setUserData = this.userData;
      }

      return this.userData;
    }
  }

  public async updateUserDetails(data: FormGroup): Promise<IApiResponse> {
    const payload = BuildExtendedValues.buildExtendedValues(data);
    const queryString = BuildExtendedValues.queryStringBuilder(payload.normal, 'set_user_data', payload.extended);
    const finalQueryString = `${queryString}&user=${this.getUser}&access_token=${this.getToken}`;

    this.userData = undefined;

    return await this.post(finalQueryString);
  }


  /* public getAuthStatusListener(): Observable<UserMenuData> {
    return this.authDataListener.asObservable();
  } */



  private queryStringBuilder(data: any, method: string): string {
    let query = `${this.apiBaseUrl}method=${method}`;

    for (const prop in data) {
      if (data) {
        query = `${query}&${prop}=${data[prop]}`;
      }
    }

    return query;
  }

}
