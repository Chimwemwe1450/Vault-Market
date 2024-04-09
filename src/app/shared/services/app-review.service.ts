import { Injectable } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { AppRate, AppRateReviewTypeAndroid, AppRateReviewTypeIos } from '@ionic-native/app-rate/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppReviewService {

  constructor(
    private appRate: AppRate,
    private platform: Platform
  ) { }

  public init(): void {
    if (Capacitor.isNativePlatform()) {
      this.platform.ready()
        .then(() => {
          this.appRate.setPreferences({
            displayAppName: 'Vault Markets',
            usesUntilPrompt: 3,
            storeAppURL: {
              ios: 'com.vault.markets',
              android: 'market://details?id=com.vault.markets'
            },
            reviewType: {
              ios: AppRateReviewTypeIos.InAppReview,
              android: AppRateReviewTypeAndroid.InAppReview
            },
            customLocale: {
              title: 'Would you mind rating Vault Markets app?',
              message: 'Rating us helps to promote our app. Thanks for your support!',
              cancelButtonLabel: 'Cancel',
              laterButtonLabel: 'Remind Me Later',
              rateButtonLabel: 'Rate Now',
              yesButtonLabel: 'Yes',
              noButtonLabel: 'No',
              appRatePromptTitle: 'Do you like using Vault Markets app?',
              feedbackPromptTitle: 'Mind giving us some feedback?',
            }
          });
          this.appRate.promptForRating(false);
        });
    };
  }

}
