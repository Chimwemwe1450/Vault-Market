import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent implements OnInit {

  public initValue: string;
  public data: Array<string>;
  public backupData: Array<string>;
  public header: string;

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.backupData = this.data;
  }

  /* ionViewWillEnter(): void {
    console.log('value ionViewWillEnter: ', this.initValue);
  } */

  public inputChange(event: any): void {
    const data = event['detail']['value'];
    this.onDismiss(data);
  }

  public onSearch(event: any): void {
    const filteration: string = event.target.value;
    this.data = this.filterItems(filteration);
    if (filteration.length === 0) {
         this.data = this.backupData;
    }
  }

  private filterItems(searchTerm: string): Array<string> {
    return this.backupData.filter( item => item.toLowerCase().includes(searchTerm.toLowerCase()) );
  }

  private onDismiss(data: string): void {
    this.modalController.dismiss({
      data
    });
  }
}
