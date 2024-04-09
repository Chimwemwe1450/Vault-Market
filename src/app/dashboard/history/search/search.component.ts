import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { SearchDateRange } from 'src/app/shared/models/search-date-range.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;

  public transHistoryForm: FormGroup;
  public showAdvancedSearch = false;
  public disableSearch = true;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.ontouchmove = (e) => {
      e.stopPropagation();
    };
  }

  public onSearch(): void {
    const searchValues = new SearchDateRange();
    searchValues.dateFrom = this.reverseDate(this.transHistoryForm.get('from').value);
    searchValues.dateTo = this.reverseDate(this.transHistoryForm.get('to').value);

    this.dismissModal(searchValues);
  }


  private createForm(): void {
    this.transHistoryForm = new FormGroup({
      from: new FormControl(null, {
        validators: [Validators.required]
      }),
      to: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.subscribeToForm();
  }

  private subscribeToForm(): void {
    this.transHistoryForm.valueChanges.subscribe(() => {
      if (this.transHistoryForm.valid) {
        this.disableSearch = false;
      } else {
        this.disableSearch = true;
      }
    });
  }

  private dismissModal(searchParams: SearchDateRange) {
    this.modalController.dismiss({
      ...searchParams
    });
  }

  private reverseDate(date: string): string {
    const dateArray: Array<string> = date.split('-');

    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  }

}
