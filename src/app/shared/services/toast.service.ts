import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  public async presentToast(message: string, type: string , ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      cssClass: 'toast-style',
      mode: 'ios',
      position: 'bottom',
      color: type,
    });
    toast.present();
  }

  public async presentToastWithButton(message: string, buttonTitle: string, type: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      cssClass: 'toast-style',
      mode: 'ios',
      position: 'bottom',
      color: type,
      buttons: [
        {
          text: buttonTitle,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
