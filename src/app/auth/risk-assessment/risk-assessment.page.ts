import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';

import { ToastService } from 'src/app/shared/services/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RiskAssessmentService } from '../shared/services/risk-assessment.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import { RiskAssessment } from '../shared/models/risk-assessment.model';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.page.html',
  styleUrls: ['./risk-assessment.page.scss'],
})
export class RiskAssessmentPage implements OnInit {
  images = [
    '../../../assets/images/image1.png',
    '../../../assets/images/image2.png',
    '../../../assets/images/image3.png',
    '../../../assets/images/image4.png',
    '../../../assets/images/image5.png',
  ];

  slideOptions = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: true,
    slidesPerView: 3,
    spaceBetween: 10,
  };

  public assessSlide: any;
  public slideOpts: SwiperOptions = {
    initialSlide: 0,
    speed: 400,
    pagination: { clickable: false },
    allowTouchMove: false,
  };
  public disableButtons = {
    next: true,
    submit: true,
    later: false,
  };
  public hideSubmit = true;
  public stepData: { [key: string]: string };

  constructor(
    private _riskAssService: RiskAssessmentService,
    private _toastService: ToastService,
    private _alertService: AlertService,
    private _storageService: StorageService,
    private soliticsService: SoliticsService,

    private router: Router
  ) {}
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('risk-assessmentPage');
  }
  ngOnInit() {
    this.restoreData();
    this.reportPageEnter('risk-assessmentPage');
  }

  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }
  public setSwiperInstance(swiper: any): void {
    this.assessSlide = swiper;
  }
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }

  public goNext(): void {
    if (!this.disableButtons.next) {
      this.enableInputs();
      this.updateData();
      this.assessSlide.slideNext();

      const endOfSlide = this.assessSlide.isEnd;
      if (endOfSlide) {
        this.hideSubmit = false;
      } else {
        this.hideSubmit = true;
      }
    }
  }

  public submit(): void {
    this.disableButtons.submit = true;
    this.disableButtons.later = true;
    this.updateData();
    this.submitData();
  }

  public nextButtonState(event: boolean): void {
    if (event) {
      this.disableButtons.next = false;
      this.disableButtons.submit = false;
    } else {
      this.disableButtons.next = true;
      this.disableButtons.submit = true;
    }
  }

  public updateStepData(data: { [key: string]: string }): void {
    this.stepData = { ...data };
  }

  public continueLater(): void {
    this.updateData();
    this._alertService.presentAlert(
      'Continue Later',
      'If you choose to continue later, you will only have limited access to the app until your profile is complete.',
      'Proceed',
      'Cancel',
      async () => {
        this._riskAssService.storeData();
        this.router.navigate(['dashboard/home']);
      },
      async () => {}
    );
  }

  private submitData(): void {
    this._riskAssService
      .getAssessmentResult(this._riskAssService.getData)
      .then(async (res) => {
        if (res.status !== 200) {
          this._toastService.presentToast(
            `Assessment Failed: ${res.status}`,
            'toast-warning'
          );
          return;
        }
        const message = `score: ${res.data['score']}
          Risk Rating: ${res.data['riskRating']}`;

        this._riskAssService.storeData();
        this._storageService.setUserPreference('assessed', 'true');
        this._storageService.setUserPreference('riskScore', res.data['score']);
        this._storageService.setUserPreference(
          'riskRating',
          res.data['riskRating']
        );

        await this._toastService.presentToast('Assessment Success.', 'success');
        this.router.navigate(['auth/verify']);
        // no need to display alert at this stage. //
        /* this._alertService.presentInfoAlert(message, 'Ok', async () => {
          this.router.navigate(['auth/verify']);
        }); */
      })
      .catch((err) => {
        this._toastService.presentToast('Assessment Failed.', 'toast-warning');
        this.router.navigate(['dashboard/wallet']);
      });
  }

  private updateData(): void {
    this._riskAssService.setData = this.stepData;
  }

  private restoreData(): void {
    const data: RiskAssessment = this._riskAssService.retrieveData();

    if (data) {
      let count = 0;
      for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          if (data[prop]) {
            count++;
          }
        }
      }

      setTimeout(() => {
        this.assessSlide.slideTo(count);
        const endOfSlide = this.assessSlide.isEnd;
        if (endOfSlide) {
          this.hideSubmit = false;
        } else {
          this.hideSubmit = true;
        }
      }, 500);
    }
  }

  private enableInputs(): void {
    this.disableButtons.next = true;
    this.disableButtons.submit = true;
  }

  /* public willChange(): void {
    console.log('will start');
  } */

  /* public async touchStart(): Promise<void> {
    console.log('touch start');
    const num = await this.assessSlide.lockSwipeToNext(false);
  } */
}
