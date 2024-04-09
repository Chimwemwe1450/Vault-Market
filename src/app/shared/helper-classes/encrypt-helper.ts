import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptHelper {

  private passwordSecretKey = 's3cret-f0r-p@assword-encryption';
  private cardSecretKey = 's3cret-f0r-c@rdnumb3r-encryption';

  constructor() {}

  public encryptPassword(password: string): string {
    const pwEncrypt = CryptoJS.AES.encrypt(password, this.passwordSecretKey).toString();

    return pwEncrypt;
  }

  public decryptPassword(password: string): string {
    const pw = password;
    const result = CryptoJS.AES.decrypt(pw, this.passwordSecretKey).toString(CryptoJS.enc.Utf8);

    return result;
  }

  public encryptCardNumber(cardNum: string): string {
    const encryptedString = CryptoJS.AES.encrypt(cardNum, this.cardSecretKey).toString();

    return encryptedString;
  }

  public decryptCardNumber(cardNum: string): string {
    const card = cardNum;
    const result = CryptoJS.AES.decrypt(card, this.cardSecretKey).toString(CryptoJS.enc.Utf8);

    return result;
  }

}
