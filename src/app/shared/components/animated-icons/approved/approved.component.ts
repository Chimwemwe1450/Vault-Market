import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss'],
})
export class ApprovedComponent implements AfterViewInit {

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
