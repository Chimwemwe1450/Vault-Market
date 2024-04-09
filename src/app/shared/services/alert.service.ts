import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }

  public async presentAlert(
    header: string,
    message: string,
    confirmButtonTitle: string,
    rejectButtonTitle: string,
    accept: () => void,
    reject: () => void
  ): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      message,
      buttons: [
        {
          text: rejectButtonTitle,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            reject();
          }
        },
        {
          text: confirmButtonTitle,
          role: 'accepted',
          handler: () => {
            accept();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  public async presentInfoAlert(
    message: string,
    confirmButtonTitle: string,
    accept: () => void
  ): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message,
      buttons: [
        {
          text: confirmButtonTitle,
          role: 'accepted',
          handler: () => {
            accept();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
