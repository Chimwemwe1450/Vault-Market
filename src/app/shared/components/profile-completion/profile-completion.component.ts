import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';

import { RiskAssessment } from 'src/app/auth/shared/models/risk-assessment.model';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.scss'],
})
export class ProfileCompletionComponent implements OnInit {

  public progress = 0.0;
  public stepCount: number;
  public percentage = 0;
  public isAssessed = false;
  public isVerified = false;
  public progressItems = [
    {
      key: 'occupation',
      question: 'Occupation',
      completed: false
    },
    {
      key: 'industry',
      question: 'Employed Industry',
      completed: false
    },
    {
      key: 'sourceOfFunds',
      question: 'Source of Funds',
      completed: false
    },
    {
      key: 'nationality',
      question: 'Bank Location',
      completed: false
    },
    {
      key: 'residence',
      question: 'Residence',
      completed: false
    },
    {
      key: 'verification',
      question: 'Verification',
      completed: false
    }
  ];
  private assessData = new RiskAssessment();


  constructor(
    private _storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getStoredData();
  }

  public profileCompletion(): void {
    let route: string;
    if (!this.isAssessed) {
      route = 'auth/risk-assessment';
    } else {
      route = 'auth/verify';
    }
    this.router.navigate([route]);
  }

  public getStoredData(): void {
    this.stepCount = 0;
    this.isAssessed = this._storageService.getUserPreference<boolean>('assessed') || false;
    this.isVerified = this._storageService.getUserPreference<boolean>('verified') || false;
    const assessmentData = this._storageService.getUserPreference<RiskAssessment>('assessData');

    if (!this.isVerified) {
      console.log('not verified');

      if (assessmentData) {
        this.assessData = assessmentData;
        let count = 0;

        for (const prop in this.assessData) {
            if (this.assessData[prop]) {

              this.progressItems.forEach(item => {
                if (item.key === prop) {
                  item.completed = true;
                  count ++;
                }
              });
            }
        }
        this.stepCount += count;
      }

      setTimeout(() => {
        const percent = this.stepCount / 6 * 100;
        this.percentage = Math.trunc(percent);
        this.progress = this.percentage / 100;
      }, 2000);
    }
  }

}
