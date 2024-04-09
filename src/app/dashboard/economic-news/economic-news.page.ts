import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-economic-news',
  templateUrl: './economic-news.page.html',
  styleUrls: ['./economic-news.page.scss'],
})
export class EconomicNewsPage {
  @ViewChild('tradingviewWidget') tradingviewWidget: any;

  constructor() {}
}
