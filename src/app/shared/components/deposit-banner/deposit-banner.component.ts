import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-deposit-banner',
  templateUrl: './deposit-banner.component.html',
  styleUrls: ['./deposit-banner.component.scss'],
})
export class DepositBannerComponent implements OnInit {
  private navExtras: NavigationExtras;

  constructor(private router: Router) {}

  ngOnInit() {}

  public navigate(section: string): void {
    this.navExtras = {
      queryParams: {
        section,
      },
    };

    this.router.navigate(['dashboard/wallet'], this.navExtras);
  }
}
