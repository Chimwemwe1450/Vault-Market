import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { EncryptHelper } from '../helper-classes/encrypt-helper';

import { BankCardDetails } from '../models/bank-card-details.model';

@Injectable({
  providedIn: 'root'
})
export class BankCardService {

  private encryptHelper = new EncryptHelper();

  constructor(
    private _storageService: StorageService
  ) { }

  public storeCard(data: BankCardDetails): void {
    const cardData = data;
    const cardNumber = cardData.cardNumber;
    cardData.cardNumber = this.encryptHelper.encryptCardNumber(cardNumber);

    this._storageService.setUserPreference('bankCard', JSON.stringify(cardData));
  }

  public retrieveCard(): BankCardDetails {
    const data = this._storageService.getUserPreference<BankCardDetails>('bankCard');
    data.cardNumber = this.encryptHelper.decryptCardNumber(data.cardNumber);

    return data;
  }

}
