import { Component, OnInit } from '@angular/core';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.page.html',
  styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage implements OnInit {
  constructor(private soliticsService: SoliticsService,) {}
  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }
  blogs = [
    {
      title: 'What Is Forex?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/11/1.png',
      blogUrl: 'https://vaultmarkets.whitelabelbox.co.za/blog/what-is-forex/',
    },
    {
      title: 'Understanding Currency Pairs',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/11/2.png',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/understanding-currency-pairs/',
    },
    {
      title: 'How To Make Money Forex Trading',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/11/pexels-pixabay-259027.jpg',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/how-to-make-money-forex-trading/',
    },
    {
      title: 'Long and Short Positions',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/4.png',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/long-and-short-positions/',
    },
    {
      title: 'The Bid, Ask and Spread',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/5.png',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/the-bid-ask-and-spread/',
    },
    {
      title: 'Knowing When To Buy Or Sell A Currency Pair',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/6.png',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/knowing-when-to-buy-or-sell-a-currency-pair/',
    },
    {
      title: 'Trading In Lots & Margin Trading Explained',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/7.png',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/trading-in-lots-margin-trading-explained/',
    },
    {
      title: 'What Is A Pip?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/8.png',
      blogUrl: 'https://vaultmarkets.whitelabelbox.co.za/blog/what-is-a-pip/',
    },
    {
      title: 'What Are The Types Of Spreads In Forex?',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/9.png',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/what-are-the-types-of-spreads-in-forex/',
    },
    {
      title: 'Support And Resistance Levels',
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/10.png',
      blogUrl:
        'https://vaultmarkets.whitelabelbox.co.za/blog/support-and-resistance-levels/',
    },

    // Add more blogs as needed
  ];
  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('blogsPage');
  }
  ngOnInit(
    
  ) {   this.reportPageEnter('blogspage');}
}
