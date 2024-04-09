import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../shared/services/auth.service';

import { RegexConstants } from 'src/app/shared/constants/regex-constants';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public form: FormGroup;
  public emailRegex = RegexConstants.EmailRegex;

  constructor(
    private modalController: ModalController,
    private _toastService: ToastService,
    private _authService: AuthService,
    private soliticsService: SoliticsService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      emailAddress: new FormControl(null, {
        validators: [Validators.pattern(this.emailRegex), Validators.required]
      })
    });
    this.reportPageEnter('reset password ');
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

    if (this.form.valid) {
      const email = this.form.get('emailAddress').value;

      this._authService.resetPassword(email)
      .then(res => {
        if (res['success'] === true) {
          this._toastService.presentToast('Reset password link has been sent.', 'success');
          this.dismissModal();
        } else {
          this._toastService.presentToast(res['info']['message'], 'toast-warning');
        }

      })
      .catch(err => {
        console.log(err);
      });
    } else {
      this._toastService.presentToast('Please add a valid email address.', 'toast-warning');
    }

  }

  public dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
