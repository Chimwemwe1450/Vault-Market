import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Country } from 'src/app/shared/models/country.model';
import { MainService } from 'src/app/shared/services/main.service'; // Import your service
import { ToastService } from 'src/app/shared/services/toast.service';
import { RiskAssessmentService } from 'src/app/auth/shared/services/risk-assessment.service';
import { UserService } from 'src/app/shared/services/UserService.service';
import { DataService } from 'src/app/shared/services/Data.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.scss'],
})
export class CreateBankAccountComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modal: ElementRef<HTMLInputElement>;

  public bankAccountForm: FormGroup; // create a form group for your form
  public countries: Array<Country>;
public beneficiaryFname1 = 'default'
public isSouthAfricaSelected = false;
public isAbsaSelected = false;
public isAbsaSelected1 = false;
public isFnbSelected = false;
public isCapitecSelected = false;
public isInvestecSelected = false;
public isNedbankSelected = false;
public isTymeBankSelected = false;
public isStandardBankSelected = false;
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
    private _userService:UserService,
    private _toastService: ToastService,
    private _Data:DataService,
    private _auth:AuthService

  ) { }

  ngOnInit() {
    this.createForm();
    this.fetchCountries();
    this.bankAccountForm.get('beneficiaryFname').patchValue(this._auth.getFirstName);

    this.bankAccountForm.get('beneficiaryLname').patchValue(this._auth.getLastName);


    this.bankAccountForm.get('bankName').valueChanges.subscribe((value) => {
      this.isAbsaSelected = value === 'absa';
      this.isAbsaSelected1 = value === 'ABSA';
      this.isFnbSelected = value === 'FNB';
      this.isCapitecSelected = value === 'Capitec';
      this.isInvestecSelected = value === 'Investec';
      this.isNedbankSelected = value === 'Nedbank';
      this.isTymeBankSelected = value === 'Tyme Bank';
      this.isStandardBankSelected = value === 'Standard Bank';
  
      if (this.isSouthAfricaSelected) {
        if (this.isAbsaSelected1) {
          this.bankAccountForm.patchValue({ bankBranchCode: '632005' });
        } else if (this.isFnbSelected) {
          this.bankAccountForm.patchValue({ bankBranchCode: '250655' });
        } else if (this.isCapitecSelected) {
          this.bankAccountForm.patchValue({ bankBranchCode: '470010' });
        } else if (this.isInvestecSelected) {
          this.bankAccountForm.patchValue({ bankBranchCode: '580105' });
        } else if (this.isNedbankSelected) {
          this.bankAccountForm.patchValue({ bankBranchCode: '198765' });
        } else if (this.isTymeBankSelected) {
          this.bankAccountForm.patchValue({ bankBranchCode: '678910' });
        } else if (this.isStandardBankSelected) {
          this.bankAccountForm.patchValue({ bankBranchCode: '051001' });
        }
      }
      });
  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.ontouchmove = (e) => {
      e.stopPropagation();
    };
  }

  public countrySelected(event: any): void {
    this.selectedCountry = event;
    if (this.selectedCountry.name === 'South Africa') {
      this.isSouthAfricaSelected = true;
      this.bankAccountForm.patchValue({
        swiftCode: 'DEFAULT_SWIFT_CODE' // Replace this with the default Swift Code for South Africa
      });
    } else {
      this.isSouthAfricaSelected = false;
    }
  }


  private dismissModal() {
    this.modalController.dismiss({
      data: 'transfer'
    });
  }
  private async fetchCountries(): Promise<void> {
    try {
      this.countries = await this.mainService.getCountries();
      console.log('Countries:', this.countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }
  // create a form group for your form
  private createForm(): void {
    this.bankAccountForm = new FormGroup({
      country_id: new FormControl(),
      beneficiaryFname: new FormControl(),
      beneficiaryLname: new FormControl(),
      address: new FormControl(),
      country: new FormControl(),
      province: new FormControl(),
      zipCode: new FormControl(),
      bankName: new FormControl(),
      bankAddress: new FormControl(),
      bankCountry: new FormControl(),
      bankProvince: new FormControl(),
      bankZipCode: new FormControl(),
      bankAccountNo: new FormControl(),
      swiftCode: new FormControl(),
      bankBranch: new FormControl(),
      currencyId: new FormControl(),
      bankBranchCode: new FormControl()
      
    });




    

    this.bankAccountForm.patchValue({ address: this.beneficiaryFname1 }, { emitEvent: false });

    this.bankAccountForm.patchValue({province: this.beneficiaryFname1}, { emitEvent: false });

    this.bankAccountForm.patchValue({zipCode: this.beneficiaryFname1 }, { emitEvent: false });

    this.bankAccountForm.patchValue({bankBranch: this.beneficiaryFname1 }, { emitEvent: false });


    this.bankAccountForm.get('address').valueChanges.subscribe((value) => {
      // Set bankName value to the same as beneficiaryFname
      this.bankAccountForm.patchValue({bankAddress: value }, { emitEvent: false });
    });
    this.bankAccountForm.get('province').valueChanges.subscribe((value) => {
      // Set bankName value to the same as beneficiaryFname
      this.bankAccountForm.patchValue({bankProvince: value }, { emitEvent: false });
    });

    this.bankAccountForm.get('zipCode').valueChanges.subscribe((value) => {
      // Set bankName value to the same as beneficiaryFname
      this.bankAccountForm.patchValue({bankZipCode: value }, { emitEvent: false });
    });

    this.bankAccountForm.get('country').valueChanges.subscribe((value) => {
      // Set bankName value to the same as beneficiaryFname
      this.bankAccountForm.patchValue({bankCountry: value }, { emitEvent: false });
    });
  }
  

  // call createBankAccount method when form is submitted
  public async onSubmit(): Promise<void> {
    try {

      const response = await this.mainService.createBankAccount(
        this.bankAccountForm.get('beneficiaryFname').value,
        this.bankAccountForm.get('beneficiaryLname').value,
        this.bankAccountForm.get('address').value,
        this.selectedCountry.country_id,
        this.bankAccountForm.get('province').value,
        this.bankAccountForm.get('zipCode').value,
        this.bankAccountForm.get('bankName').value,
        this.bankAccountForm.get('bankAddress').value,
        this.selectedCountry.country_id,
        this.bankAccountForm.get('bankProvince').value,
        this.bankAccountForm.get('bankZipCode').value,
        this.bankAccountForm.get('bankAccountNo').value,
        this.bankAccountForm.get('swiftCode').value,
        this.bankAccountForm.get('bankBranch').value,
        this.bankAccountForm.get('currencyId').value,
        this.bankAccountForm.get('bankBranchCode').value
      );

      this._Data.setBankAccountDetails(this.bankAccountForm.value);
      console.log(JSON.stringify(response) );
      this._toastService.presentToast(
        'Bank  account was created .',
        'success'
      );
    } catch (error) {
      console.error('Error occurred:', error);
      this._toastService.presentToast(
        'Error  occurend in creating account .',
        'toast-warning'
      );
    }
  }

}

