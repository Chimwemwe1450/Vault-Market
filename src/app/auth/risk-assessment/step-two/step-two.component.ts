import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RiskAssessmentService } from '../../shared/services/risk-assessment.service';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {

  @Output() nextSlide = new EventEmitter<boolean>();
  @Output() sendDataBack = new EventEmitter<{ [key: string]: string }>();
  public industry: string;
  public industries: Array<string>;

  constructor(
    private _riskAssService: RiskAssessmentService,
    private soliticsService: SoliticsService,
  ) { }
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('steptwo');
  }
  ngOnInit() {
    this.getAllIndustries();
    this.reportPageEnter('steptwo');
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

  public inputChanged(): void {
    if ((this.industry === undefined) || (this.industry === null)) {
      this.canGoNext(false);
    }
    if (this.industry) {
      this.canGoNext(true);
    }
  }

  private canGoNext(next: boolean): void {
    this.nextSlide.emit(next);
    this.sendDataBack.emit({ industry: this.industry });
  }

  private getAllIndustries(): void {
    this._riskAssService.getAssessmentValues()
      .then(res => {
        this.industries = res.industries;
        this.industries.sort();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
