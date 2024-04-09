import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from 'src/app/shared/services/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MainService } from 'src/app/shared/services/main.service';
import { AuthService } from '../shared/services/auth.service';

import { Registration } from '../shared/models/registration.model';
import { Country } from 'src/app/shared/models/country.model';
import { UserService } from 'src/app/shared/services/UserService.service';
import { RegexConstants } from 'src/app/shared/constants/regex-constants';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registrationForm: FormGroup;
  public navigate = false;
  public terms = false;
  public entitySelect = 'individual';
  public countries: Array<Country>;
  public dialCodes: any;
  public currencies: any;
  public selectedCountry = {
    country_id: undefined,
    name: undefined,
    iso_alpha2_code: undefined,
    tel_country_code: undefined,
    show_on_register: undefined,
    currency: undefined,
    currency_id: undefined
  };
  public selectedDialCode = {
    code: undefined,
    name: undefined
  };
  public selectedCurrency = {
    currency_id: undefined,
    name: undefined,
    title: undefined,
    publish: undefined,
    sign: undefined,
    is_wallet: undefined
  };

  private blockedCountryIds = [40, 113, 118, 231];

  constructor(
    private _toastService: ToastService,
    private _alertService: AlertService,
    private _mainService: MainService,
    private _authService: AuthService,
    private _UserService: UserService,
    private router: Router,
    private soliticsService: SoliticsService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getAllCountries();
    this.getAllCodes();
    this.getAllCurrencies();
    this.reportPageEnter('RegisterPage');
  }

  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }

  public onSubmit(): void {
    this.navigate = true;

    if (this.registrationForm.valid) {
      if (!this.terms) {
        this._toastService.presentToast('Terms have not been accepted.', 'toast-warning');
        return;
      }
      const password = this.registrationForm.get('password').value;
      const confirmPassword = this.registrationForm.get('confirmPassword').value;

      if (password === confirmPassword) {
        const payload: Registration = {...this.registrationForm.value};
        delete payload.confirmPassword;

        this._authService.register(payload)
          .then((res) => {
            if (res['success'] === true) {
              this._toastService.presentToast('Registration Successful', 'success');
              this._UserService.setUserName(this.registrationForm.get('fname').value); // Store the username
              this.router.navigate(['auth/verify']);
            } else {
              this._toastService.presentToast(res['info']['message'], 'toast-warning');
            }

          })
          .catch((err) => {
            console.log('registration error: ', err);
          });

      } else {
        this.registrationForm.get('password').setValue('', {onlySelf: true});
        this.registrationForm.get('confirmPassword').setValue('', {onlySelf: true});
        this._toastService.presentToast('Passwords not matching.', 'toast-warning');
      }
    } else {
      this._toastService.presentToast('Form is incomplete.', 'toast-warning');
    }

  }

  public navBack(): void {}

  public termsAgreement(): void {
    this.terms = !this.terms;
    console.log('agreed to terms: ', this.terms);
  }

  public entitySelection(event: Event): void {
    this.entitySelect = event['detail']['value'];
    console.log('entitySelect: ', this.entitySelect);

    if (this.entitySelect === 'company') {
      this.registrationForm.controls.company.enable();
    } else {
      this.registrationForm.controls.company.disable();
    }
  }

  public countrySelected(event: any): void {
    this.registrationForm.patchValue({country_id: event['country_id']});
    this.selectedCountry = event;
  }

  public dialCodeSelected(event: any): void {
    this.registrationForm.patchValue({tel_country_code: event['code']});
    this.selectedDialCode = event;
  }

  public currencySelected(event: any): void {
    this.registrationForm.patchValue({currency: event['name']});
    this.selectedCurrency = event;
  }

  public nationalityModal(): void {
    let message = 'Vault Markets does not offer services to US citizens nor US residents for tax purposes, ';
    message = message + 'as well as residents of certain jurisdictions such as the Japan, Canada and North Korea.';

    this._alertService.presentInfoAlert(
      message,
      'Ok',
      async () => {}
    );
  }


  private getAllCountries(): void {
    this._mainService.getCountries()
      .then(res => {

        if (res) {
          const countries: Array<Country> = res;

          for (const id of this.blockedCountryIds) {
            const index = res.findIndex(country => country.country_id === id) ;
            countries.splice(index, 1);
          }

          this.countries = countries;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  private getAllCodes(): void {
    this._mainService.getDialingCodes()
      .then(res => {
        this.dialCodes = res.countries;
      })
      .catch(err => {
        console.log(err);
      });
  }

  private getAllCurrencies(): void {
    this._mainService.getCurrencies()
      .then(res => {
        this.currencies = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // buggy password:
  // asdf!@#$:LKJ

  private createForm(): void {
    // password: //
    // 'X!2d65gD' //
    this.registrationForm = new FormGroup({
      fname: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(RegexConstants.NameRegex)]
      }),
      company: new FormControl({value: null, disabled: true}, {
        validators: [Validators.required]
      }),
      lname: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(RegexConstants.NameRegex)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(RegexConstants.PasswordRegex)]
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(RegexConstants.PasswordRegex)]
      }),
      currency: new FormControl(null, {
        validators: [Validators.required]
      }),
      country_id: new FormControl(null, {
        validators: [Validators.required]
      }),
      tel_number: new FormControl(null, {
        validators: [Validators.required]
      }),
      tel_country_code: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

}
