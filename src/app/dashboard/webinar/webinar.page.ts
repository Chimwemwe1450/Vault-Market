import { Component, OnInit } from '@angular/core';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.page.html',
  styleUrls: ['./webinar.page.scss'],
})
export class WebinarPage implements OnInit {
  constructor(   private soliticsService: SoliticsService,) {}
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('loginPage');
  }
  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }
  webinars = [
    {
      title: 'The Trading Vault: Episode #1 with Jason Noah',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2023/07/vault-markets-podcast-episode-1.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=w4QzL63PKP0&t=2s',
    },
    {
      title: 'The Trading Vault: Episode #2 with Izzy and Leadership Monhla',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/The-Trading-Vault-EP2.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=njOqoyWfUUw',
    },

    {
      title: 'The Trading Vault Episode #3 with Clint Fester ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/1Episode-3-Clint-Fester_EP.3.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=FrbARxnOktU',
    },
    {
      title: 'The Trading Vault Episode #4 with Kelly Abrahams ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/Episode-4-Kelly-Abrahams.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=mYGcyFW2y7A',
    },

    {
      title: 'The Trading Vault: Episode #5 with Thomas Lobban ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/Episode-5-Thomas-Lobban_1.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=NuLNd9pkK_c',
    },

    {
      title: 'The Trading Vault: Episode #6 with Lunga Malaza ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/IMG-20220323-WA0040-1024x1024.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Rvalb9y0q2Y',
    },

    {
      title: 'The Trading Vault: Episode #7 with Bandile Lugayeni ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/2022/10/Episode-7.png',
      videoUrl:
        'https://www.youtube.com/watch?v=n5pIT-8-vaM&list=PLVBhcYWsxPhbmOYu-XgjBEHgm1ez-p4Jy&index=8&t=9s',
    },
    {
      title: 'The Trading Vault: Episode #8 with FX Goat ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/2022/10/Episode-8.png',
      videoUrl:
        'https://www.youtube.com/watch?v=77KwhYbzvcU&list=PLVBhcYWsxPhbmOYu-XgjBEHgm1ez-p4Jy&index=8',
    },
    {
      title: 'The Trading Vault: Episode #9 with Richlit ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/2022/10/Episode-9.png',
      videoUrl:
        'https://www.youtube.com/watch?v=P-RsI4r1pMc&list=PLVBhcYWsxPhbmOYu-XgjBEHgm1ez-p4Jy&index=9',
    },
    {
      title: 'The Trading Vault: Episode #10 with Shaquel Samaai ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/2022/10/Episode-10.png',
      videoUrl:
        'https://www.youtube.com/watch?v=92PtqkW0eTY&list=PLVBhcYWsxPhbmOYu-XgjBEHgm1ez-p4Jy&index=10',
    },
    {
      title: 'The Trading Vault: Episode #11 with Jason Noah ',
      imageUrl:
        'https://vaultmarkets.trade/wp-content/uploads/2022/10/Episode-11.png',
      videoUrl: 'https://www.youtube.com/watch?v=w4QzL63PKP0&t=2s',
    },
    // Add more podcasts as needed
  ];

  ngOnInit() {  this.reportPageEnter('webinerPage');}
}
