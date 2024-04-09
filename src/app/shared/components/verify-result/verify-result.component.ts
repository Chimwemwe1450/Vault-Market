import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-verify-result',
  templateUrl: './verify-result.component.html',
  styleUrls: ['./verify-result.component.scss'],
})
export class VerifyResultComponent implements OnInit {

  public result: boolean;
  public error: string;
  public success = false;

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.success = this.result;
  }

  public onButtonClick(path: string): void {
    this.dismissModal(path);
  }

  private dismissModal(param: string) {
    this.modalController.dismiss({
      data: param
    });
  }

}
