import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RiskAssessmentService } from '../../shared/services/risk-assessment.service';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit {

  @Output() nextSlide = new EventEmitter<boolean>();
  @Output() sendDataBack = new EventEmitter<{ [key: string]: string }>();
  public sourceOfFunds: string;
  public sources: Array<string>;

  constructor(
    private _riskAssService: RiskAssessmentService,
    private soliticsService: SoliticsService,
  ) { }
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('stepthree');
  }
  ngOnInit() {
    this.getAllSources();
    this.reportPageEnter('stepthree');
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
    if ((this.sourceOfFunds === undefined) || (this.sourceOfFunds === null)) {
      this.canGoNext(false);
    }
    if (this.sourceOfFunds) {
      this.canGoNext(true);
    }
  }

  private canGoNext(next: boolean): void {
    this.nextSlide.emit(next);
    this.sendDataBack.emit({ sourceOfFunds: this.sourceOfFunds });
  }

  private getAllSources(): void {
    this._riskAssService.getAssessmentValues()
      .then(res => {
        this.sources = res.sourceOfFunds;
        this.sources.sort();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
