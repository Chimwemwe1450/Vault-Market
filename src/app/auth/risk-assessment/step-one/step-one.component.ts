import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RiskAssessmentService } from '../../shared/services/risk-assessment.service';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {

  @Output() nextSlide = new EventEmitter<boolean>();
  @Output() sendDataBack = new EventEmitter<{ [key: string]: string }>();
  public occupation: string;
  public occupations: Array<string>;

  constructor(
    private _riskAssService: RiskAssessmentService,
    private soliticsService: SoliticsService,
  ) { }
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('step-one');
  }
  ngOnInit() {
    this.getAllOccupations();
    this.reportPageEnter('step-one');
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
    if ((this.occupation === undefined) || (this.occupation === null)) {
      this.canGoNext(false);
    }
    if (this.occupation) {
      this.canGoNext(true);
    }
  }

  private canGoNext(next: boolean): void {
    this.nextSlide.emit(next);
    this.sendDataBack.emit({ occupation: this.occupation });
  }

  private getAllOccupations(): void {
    this._riskAssService.getAssessmentValues()
      .then(res => {
        this.occupations = res.occupations;
        this.occupations.sort();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
