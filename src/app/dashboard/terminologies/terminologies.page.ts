import { Component, OnInit } from '@angular/core';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-terminologies',
  templateUrl: './terminologies.page.html',
  styleUrls: ['./terminologies.page.scss'],
})
export class TerminologiesPage implements OnInit {
  constructor( private soliticsService: SoliticsService,) {}
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
  terminologies = [
    {
      title: 'What are the four types of traders?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/what-are-the-four-types-of-traders.png',
      videoUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/What-Are-The-Four-Types-Of-Traders.mp4',
    },
    {
      title: 'What is a free margin?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/what-is-a-free-margin.png',
      videoUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/What-Is-A-Free-Margin.mp4',
    },

    {
      title: 'What is spread?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/what-is-spread.png',
      videoUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/What-Is-Spread.mp4',
    },
    {
      title: 'What is leverage?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/what-is-leverage.png',
      videoUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/What-Is-Leverage.mp4',
    },

    {
      title: 'What is a lot size?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/what-is-lot-size.png',
      videoUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/What-Is-A-Lot-Size.mp4',
    },

    {
      title: 'What are margins?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/what-are-margins.png',
      videoUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/What-Are-Margins.mp4',
    },
    // Add more terminologies as needed
  ];
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('TerminologiesPagee');
  }
  ngOnInit() {
    this.reportPageEnter('TerminologiesPage');}
}
