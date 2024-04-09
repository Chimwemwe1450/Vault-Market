import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  @Input() active: number;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  public navigate(route: string): void {
    this.router.navigateByUrl(route, {replaceUrl: true}).then();
  }

}
