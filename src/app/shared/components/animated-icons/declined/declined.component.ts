import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-declined',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.scss'],
})
export class DeclinedComponent implements AfterViewInit {

  public done = false;

  constructor() { }

  ngAfterViewInit(): void {
    this.stopAnimation();
  }

  private stopAnimation(): void {
    setTimeout(() => {
      this.done = true;
    }, 1500);
  }

}
