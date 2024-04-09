import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ListModalComponent } from './list-modal/list-modal.component';

@Component({
  selector: 'app-country-select-list',
  templateUrl: './country-select-list.component.html',
  styleUrls: ['./country-select-list.component.scss'],
})
export class CountrySearchListComponent implements OnInit {

  @Input() value: any;
  @Input() displayValue: string;
  @Input() list: Array<any>;
  @Output() valueSelected = new EventEmitter<any>();

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  public launchModal(): void {
    this.listModal();
  }

  private async listModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ListModalComponent,
      componentProps: {
        initValue: this.value,
        data: this.list
      },
      cssClass: 'search-list-modal-class',
      showBackdrop: true,
      backdropDismiss: true,
      handle: true
    });
    await modal.present();

    return modal.onDidDismiss()
      .then((res) => {
        if (res.data) {
          const country = res.data.data;
          this.valueSelected.emit(country);
          this.displayValue = country['name'];
        }
      });
  }
}
