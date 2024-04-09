import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-fab-menu',
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
})
export class FabMenuComponent implements OnInit {

  private navExtras: NavigationExtras;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  public navigate(section: string): void {
    this.navExtras = {
      queryParams: {
        section
      }
    };

    this.router.navigate(['dashboard/wallet'], this.navExtras);
  }
}
