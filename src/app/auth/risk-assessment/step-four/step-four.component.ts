import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RiskAssessmentService } from '../../shared/services/risk-assessment.service';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {

  @Output() nextSlide = new EventEmitter<boolean>();
  @Output() sendDataBack = new EventEmitter<{ [key: string]: string }>();
  public residence: string;
  public countries: Array<string>;

  constructor(
    private _riskAssService: RiskAssessmentService,
    private soliticsService: SoliticsService,
  ) { }
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('step-4');
  }
  ngOnInit() {
    this.getAllCountries();
    this.reportPageEnter('step-4');
  }
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }
  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }

  public inputChanged(event: string): void {
    this.residence = event;
    if ((this.residence === undefined) || (this.residence === null)) {
      this.canGoNext(false);
    }
    if (this.residence) {
      this.canGoNext(true);
    }
  }

  private canGoNext(next: boolean): void {
    this.nextSlide.emit(next);
    this.sendDataBack.emit({ residence: this.residence });
  }

  private getAllCountries(): void {
    this._riskAssService.getAssessmentValues()
      .then(res => {
        this.countries = res.countries;
        this.countries.sort();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
