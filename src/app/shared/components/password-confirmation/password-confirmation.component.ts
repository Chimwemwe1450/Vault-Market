import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { EncryptHelper } from '../../helper-classes/encrypt-helper';

import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.scss'],
})
export class PasswordConfirmationComponent implements OnInit {

  public password: string;
  private passwordConfirmed = false;
  private encryptHelper = new EncryptHelper();

  constructor(
    private modalController: ModalController,
    private _toastService: ToastService,
    private _storageService: StorageService
  ) { }

  ngOnInit() {}

  public onSubmitt(): void {
    const encryptedPw = this._storageService.getUserPreference<string>('password');
    const pw = this.encryptHelper.decryptPassword(encryptedPw);

    if (pw === this.password) {
      this.passwordConfirmed = true;
      this._toastService.presentToast('Correct password.', 'success');

      setTimeout(() => {
        this.dismissModal();
      }, 2000);
    } else {
      this._toastService.presentToast('Incorrect password.', 'toast-warning');
    }
  }

  public dismissModal() {
    this.modalController.dismiss({
      data: this.passwordConfirmed
    });
  }
}
