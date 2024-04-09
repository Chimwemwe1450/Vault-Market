import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profit-calculator',
  templateUrl: './profit-calculator.page.html',
  styleUrls: ['./profit-calculator.page.scss'],
})
export class ProfitCalculatorPage  {
  accountCurrency: string = 'AUD';
  currencyPair: string = 'AUD/USD';
  tradeSide: string = 'buy';
  positionSize: number;
  openPrice: number;
  closePrice: number;
  period: number = 0;
  profit: string = null;
  usdAudRate: number = 1.51451; // Change this rate if needed
  constructor() { }
  calculateProfit(): void {
    const positionSize = Number(this.positionSize);
    const profitFactor = this.tradeSide === 'buy' ? 1 : -1;
    const profit = (this.closePrice - this.openPrice) * this.positionSize * this.usdAudRate * profitFactor - this.period * 0.41;
    this.profit = profit.toFixed(2);
  }
}
