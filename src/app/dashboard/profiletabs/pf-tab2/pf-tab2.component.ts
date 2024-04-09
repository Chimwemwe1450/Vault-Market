import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MainService } from 'src/app/shared/services/main.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';

import { Profile } from 'src/app/shared/models/profile.model';

import { Country } from 'src/app/shared/models/country.model';

import { ProfileCompletionComponent } from 'src/app/shared/components/profile-completion/profile-completion.component';
import { MenuComponent } from 'src/app/menu/menu/menu.component';

class FileBundle {
  idDoc: File;
  residenceDoc: File;
  verifyDoc: File;
  image?: File;
}

@Component({
  selector: 'app-pf-tab2',
  templateUrl: './pf-tab2.component.html',
  styleUrls: ['./pf-tab2.component.scss'],
})
export class PfTab2Component implements OnInit {
  @ViewChild('profileCompletion') childComp: ProfileCompletionComponent;
  @ViewChild(MenuComponent) menuComponent: MenuComponent;
  @ViewChild('avatar') fileInput: ElementRef;

  public profileImageUrl: string;
  public emailForm: FormGroup;
  public phoneNumberForm: FormGroup;
  public passwordForm: FormGroup;
  public addressForm: FormGroup;
  public secQuestionsForm: FormGroup;
  public idForm: FormGroup;
  public new_profile_image_url: string;
  public data: Profile = new Profile();
  public countries: Array<Country>;

  public enableEditing = {
    emailForm: false,
    passwordForm: false,
    phoneNumberForm: false,
    addressForm: false,
    secQuestionsForm: false,
    idForm: false,
    dob: false,
    termsAndCond: false,
  };
  public selectedCountry = {
    country_id: undefined,
    name: undefined,
    iso_alpha2_code: undefined,
    tel_country_code: undefined,
    show_on_register: undefined,
    currency: undefined,
    currency_id: undefined,
  };

  public filesToUpload = new FileBundle();
  public verifyButton = {
    style: 'outline',
    disabled: true,
  };
  public image_portrait: string;

  constructor(
    private _mainService: MainService,
    private _authService: AuthService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getAllCountries();
    this.getProfileDetails();
    this.loadAvatar();
  }

  ionViewWillEnter(): void {
    this.childComp.getStoredData();
  }

  public getProfileDetails(): void {
    this._authService
      .getUserData()
      .then((res) => {
        this.data = res;
        this.patchForm();
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  public updateDetails(formGroupName: string): void {
    this.setDetails(formGroupName);
  }

  public editControl(formGroupName: string): void {
    if (this[formGroupName] !== undefined) {
      if (this[formGroupName].disabled) {
        this[formGroupName].enable();
      } else {
        this[formGroupName].disable();
      }
    }

    this.enableEditing[formGroupName] = !this.enableEditing[formGroupName];

    // Keep specific input disabled //
    if (formGroupName === 'emailForm') {
      this.emailForm.controls['email'].disable();
    }
  }

  public resetPassword(): void {
    const email = this.emailForm.get('email').value;

    this._authService
      .resetPassword(email)
      .then((res) => {
        if (res.success) {
          this._toastService.presentToast(
            'Reset password link has been sent.',
            'success'
          );
        } else {
          this._toastService.presentToast(res.info.message, 'toast-warning');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public closeBlock(formGroupName: string): void {
    this.enableEditing[formGroupName] = false;

    if (this[formGroupName] !== undefined) {
      this[formGroupName].disable();
    }
  }
  public getProfileDetails1(): void {
    this._authService
      .getUserData()
      .then((res) => {
        this.data = res;
        this.patchForm();

        // Set the profileImageUrl property based on the received data
        // Replace 'profile_image_url' with the actual property name in the response
        this.profileImageUrl = res.profile_image_url;
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  public onAvatarUpload(event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filesToUpload.image = inputElement.files[0] as File;

    // Read the uploaded file as a data URL
    const reader = new FileReader();
    reader.readAsDataURL(this.filesToUpload.image);
    reader.onload = () => {
      // Set the data.image_portrait to the data URL
      this.data.image_portrait = reader.result as string;

      // Save the data URL to localStorage
      localStorage.setItem('uploadedImage', this.data.image_portrait);
    };

    this.uploadAvatar();
  }

  public getSavedImage(): string | null {
    return localStorage.getItem('uploadedImage');
  }

  public deleteSavedImage(): void {
    // Clear the saved image from localStorage
    localStorage.removeItem('uploadedImage');
    this.data.image_portrait = null;
    // Clear the profile image URL
    this.profileImageUrl = null;
  }

  public async uploadAvatar(): Promise<void> {
    if (!this.filesToUpload.image) {
      this._toastService.presentToast(
        'Please select an image file to upload.',
        'toast-warning'
      );
      return;
    }

    try {
      const response = await this._mainService.userProfileImageUpload1(
        this.filesToUpload.image
      );
      console.log('success: ', JSON.stringify(response));
      this._toastService.presentToast(
        'Profile image uploaded successfully.',
        'success'
      );

      // Save the response to localStorage
      localStorage.setItem('profileImageResponse', JSON.stringify(response));

      // Update the profileImageUrl property with the new image URL
      // Replace 'new_profile_image_url' with the actual property name in the response
      this.profileImageUrl = this.new_profile_image_url;
    } catch (error) {
      console.log('error: ', error);
      if (error.status === 403) {
        this._toastService.presentToast(
          'You do not have permission to perform this action.',
          'toast-warning'
        );
      } else {
        this._toastService.presentToast(
          'Profile image upload failed.',
          'toast-warning'
        );
      }
    }
  }

  public loadAvatar(): void {
    const savedImageDataUrl = this.getSavedImage();

    if (savedImageDataUrl) {
      this.profileImageUrl = savedImageDataUrl;
    } else {
      // Load a default image or handle the situation when there is no saved image
    }
  }

  public onUpload(event, docType: string): void {
    if (docType === 'idDoc') {
      this.filesToUpload.idDoc = event.target.files[0] as File;
      console.log('file: ', this.filesToUpload.idDoc);
      // this.addRegistry.get('upload').setValue(file);
    } else if (docType === 'residenceDoc') {
      this.filesToUpload.residenceDoc = event.target.files[0] as File;
      console.log('file: ', this.filesToUpload.residenceDoc);
      // this.addRegistry.get('upload').setValue(file);
    } else if (docType === 'verifyDoc') {
      this.filesToUpload.verifyDoc = event.target.files[0] as File;
      console.log('file: ', this.filesToUpload.verifyDoc);
      // this.addRegistry.get('upload').setValue(file);
    }

    if (
      this.filesToUpload.idDoc &&
      this.filesToUpload.residenceDoc &&
      this.filesToUpload.verifyDoc
    ) {
      this.verifyButton.style = 'solid';
      this.verifyButton.disabled = false;
    } else {
      this.verifyButton.style = 'outline';
      this.verifyButton.disabled = true;
    }
  }

  public countrySelected(event: any): void {
    this.addressForm.patchValue({ cou_id: event['country_id'] });
    this.selectedCountry = event;
  }

  private getAllCountries(): void {
    this._mainService
      .getCountries()
      .then((res) => {
        this.countries = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private createForm(): void {
    this.emailForm = new FormGroup({
      email: new FormControl(this.data.email, {
        validators: [Validators.required],
      }),
      email2: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.emailForm.disable();

    this.passwordForm = new FormGroup({
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
      membersPassword: new FormControl(null, {
        validators: [Validators.required],
      }),
      membersNewPassword: new FormControl(null, {
        validators: [Validators.required],
      }),
      membersPasswordConfirm: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.passwordForm.disable();

    this.phoneNumberForm = new FormGroup({
      tel1: new FormControl(this.data.tel1, {
        validators: [Validators.required],
      }),
      tel2: new FormControl(null, {
        validators: [Validators.required],
      }),
      tel3: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.phoneNumberForm.disable();

    this.addressForm = new FormGroup({
      address: new FormControl(this.data.address, {
        validators: [Validators.required],
      }),
      buildingNumber: new FormControl(null, {
        validators: [Validators.required],
      }),
      city: new FormControl(null, {
        validators: [Validators.required],
      }),
      zip: new FormControl(null, {
        validators: [Validators.required],
      }),
      cou_id: new FormControl(null, {
        validators: [Validators.required],
      }),
      province: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.addressForm.disable();

    this.secQuestionsForm = new FormGroup({
      question1: new FormControl(null, {
        validators: [Validators.required],
      }),
      answer1: new FormControl(null, {
        validators: [Validators.required],
      }),
      question2: new FormControl(null, {
        validators: [Validators.required],
      }),
      answer2: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.secQuestionsForm.disable();

    this.idForm = new FormGroup({
      passportNumber: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.idForm.disable();
  }

  private patchForm(): void {
    this.emailForm.patchValue({ ...this.data });

    this.phoneNumberForm.patchValue({ ...this.data });

    this.addressForm.patchValue({ ...this.data });
    this.addressForm.patchValue({ cou_id: +this.data.country_id });
    this.selectedCountry = this.countries.find(
      (item: any) => item['country_id'] === Number(this.data.country_id)
    );
  }

  private setDetails(formGroupName: string): void {
    this._authService
      .updateUserDetails(this[formGroupName])
      .then((res) => {
        const code = res['info']['code'];

        if (code === 200) {
          this._toastService.presentToast(
            'Profile updated successfully.',
            'success'
          );
          this.getProfileDetails();
          this.editControl(formGroupName);
        } else {
          this._toastService.presentToast(
            'Profile update failed.',
            'toast-warning'
          );
        }
      })
      .catch((err) => {
        console.log('error: ', err);
        // this._toastService.presentToast(err, 'toast-warning');
      });
  }
}
