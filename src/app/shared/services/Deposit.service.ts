import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private depositAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setDepositAmount(amount: number) {
    this.depositAmount.next(amount);
  }

  getDepositAmount(): BehaviorSubject<number> {
    return this.depositAmount;
  }
}
