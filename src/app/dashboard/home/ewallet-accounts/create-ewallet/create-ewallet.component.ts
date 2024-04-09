import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Country } from 'src/app/shared/models/country.model';
import { MainService } from 'src/app/shared/services/main.service'; 
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
@Component({
  selector: 'app-create-ewallet',
  templateUrl: './create-ewallet.component.html',
  styleUrls: ['./create-ewallet.component.scss'],
})
export class CreateEwalletComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;
  public EwalletForm: FormGroup; 
  public countries: Array<Country>;



  public selectedCountry = {
    country_id: undefined,
    name: undefined,
    iso_alpha2_code: undefined,
    tel_country_code: undefined,
    show_on_register: undefined,
    currency: undefined,
    currency_id: undefined
  };

  
  constructor(
    private modalController: ModalController,
    private mainService: MainService,
    private _toastService: ToastService,
    private _auth:AuthService
  ) { }

  ngOnInit() {
    this.createForm();
    this.EwalletForm.get('ownerName').patchValue(this._auth.getFirstName);
    this.EwalletForm.get('billingEmail').patchValue(this._auth.getEmail);
    this.EwalletForm.get('billingTel').patchValue(this._auth.getContactNumber);

  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.ontouchmove = (e) => {
      e.stopPropagation();
    };
  }

  public countrySelected(event: any): void {
    // this.form.patchValue({country_id: event['country_id']});
    this.selectedCountry = event;
  }

  private dismissModal() {
    this.modalController.dismiss({
      data: 'transfer'
    });
  }

  private createForm(): void {
    this.EwalletForm = new FormGroup({
      ownerName: new FormControl(),
      ewalletType: new FormControl(),
      walletAddress: new FormControl(),
      billingEmail: new FormControl(),
      billingAddress: new FormControl(),
      billingCity: new FormControl(),
      billingCountry: new FormControl(),
      billingProvince: new FormControl(),
      billingZip: new FormControl(),
      billingTelCountryCode: new FormControl(),
      billingTel: new FormControl(),
    });
  }
  
  public async onSubmit(): Promise<void> {
    try {
      const ewalletType = this.EwalletForm.get('ewalletType').value; // Get the selected eWallet type
      console.log('Selected eWallet Type:', ewalletType);
  
      const response = await this.mainService.createEwallet(
        this.EwalletForm.get('ownerName').value,
        ewalletType,
        this.EwalletForm.get('walletAddress').value,
        this.EwalletForm.get('billingEmail').value,
        this.EwalletForm.get('billingAddress').value,
        this.EwalletForm.get('billingCity').value,
        this.selectedCountry.country_id, //assuming you want to use the selected country's id
        this.EwalletForm.get('billingProvince').value,
        this.EwalletForm.get('billingZip').value,
        this.selectedCountry.tel_country_code, //assuming you want to use the selected country's tel_country_code
        this.EwalletForm.get('billingTel').value,
      );
      console.log(JSON.stringify(response));
  
      this._toastService.presentToast(
        'E wallet account created.',
        'success'
      );
    } catch (error) {
      console.error('Error occurred:', error);
  
      this._toastService.presentToast(
        'Profile image upload failed.',
        'toast-warning'
      );
    }
  }
  

  }
  

