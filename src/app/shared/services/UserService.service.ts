import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private bankAccountDetails;
  private userName = new BehaviorSubject<string>('');

  constructor() { }

  setUserName(name: string) {
    this.userName.next(name);
  }

  getUserName() {
    return this.userName.asObservable();
  }

  getCurrentUserName() {
    return this.userName.getValue();
  }

  setBankAccountDetails(bankAccountDetails) {
    this.bankAccountDetails = bankAccountDetails;
  }

  getBankAccountDetails() {
    return this.bankAccountDetails;
  }
}
