import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ListModalComponent } from './list-modal/list-modal.component';

@Component({
  selector: 'app-search-select-list',
  templateUrl: './search-select-list.component.html',
  styleUrls: ['./search-select-list.component.scss'],
})
export class SearchSelectListComponent implements OnInit {

  @Input() placeholder: string;
  @Input() header: string;
  @Input() value: string;
  @Input() list: Array<string>;
  @Output() valueSelected = new EventEmitter<string>();

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
        data: this.list,
        header: this.header
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
          this.valueSelected.emit(res.data.data);
        }
      });
  }
}
