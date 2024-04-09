import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private bankAccountDetails;

  constructor() { }

  setBankAccountDetails(bankAccountDetails) {
    this.bankAccountDetails = bankAccountDetails;
  }

  getBankAccountDetails() {
    return this.bankAccountDetails;
  }
}
