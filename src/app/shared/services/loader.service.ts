import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: HTMLIonLoadingElement;
  private isLoading = false;
  private presentCount = 0;
  private dismissCount = 0;

  constructor(
    public loadingController: LoadingController
  ) {}

  public async presentLoading(message?: string, duration?: number): Promise<void> {
    this.presentCount += 1;

    if (this.isLoading) {
      return;
    } else {
      this.isLoading = true;
    }

    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-loader',
      message,
      duration,
      spinner: 'lines-sharp',
    });
    await this.loading.present();

    return await this.loading.present();
  }

  public async dismissLoading(): Promise<void> {
    this.dismissCount += 1;

    if (this.isLoading) {
      if (this.presentCount === this.dismissCount) {
        this.loadingController.dismiss();
        this.isLoading = false;
        this.presentCount = 0;
        this.dismissCount = 0;
      }
    }
  }

}
