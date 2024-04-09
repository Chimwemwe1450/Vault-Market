import { Injectable } from '@angular/core';

import { FileBundle } from 'src/app/auth/shared/models/file-bundle.model';
import { RiskAssessment } from 'src/app/auth/shared/models/risk-assessment.model';
import { BankCardDetails } from '../models/bank-card-details.model';

class StoredData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  lightMode: boolean;
  token: string;
  verified: boolean;
  verifyData: FileBundle;
  assessed: boolean;
  assessData: RiskAssessment;
  riskScore: string;
  riskRating: string;
  currency: string;
  country: string;
  tradingAccount: string;
  bankCard: BankCardDetails;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private userData: StoredData;

  constructor() {}

  public getUserPreference<T>(key: string): T {
    const currentUser = this.getCurrentUser();
    this.userData = JSON.parse(localStorage.getItem(currentUser));
    let value: T;

    if (!this.userData) {
      return null;
    }

    try {
      value = JSON.parse(this.userData[key]);
    } catch {
      value = this.userData[key];
    }
    console.log('getStorage: ', key, value);

    return value;
  }

  public setUserPreference(key: string, value: string): void {
    console.log('setStorage: ', key, value);
    const currentUser = this.getCurrentUser();
    this.userData = JSON.parse(localStorage.getItem(currentUser));

    if (!this.userData) {
      this.userData = new StoredData();
    }
    this.userData[key] = value;
    // Modify the value of the lightMode property
    if (key === 'lightMode') {
      this.userData[key] = !!value; // This will convert the value to a boolean and store it in the userData object
    } else {
      this.userData[key] = value;
    }
    localStorage.setItem(currentUser, JSON.stringify(this.userData));
  }

  public setRememberMe(value: boolean): void {
    localStorage.setItem('rememberMe', JSON.stringify(value));
  }

  public getRememberMe(): boolean {
    const result: boolean =
      JSON.parse(localStorage.getItem('rememberMe')) || false;

    return result;
  }

  public setCurrentUser(userId: string): void {
    localStorage.setItem('currentUser', userId);
  }

  private getCurrentUser(): string {
    return localStorage.getItem('currentUser');
  }
}
