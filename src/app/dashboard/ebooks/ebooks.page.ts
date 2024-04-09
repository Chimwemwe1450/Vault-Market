import { Component, OnInit } from '@angular/core';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-ebooks',
  templateUrl: './ebooks.page.html',
  styleUrls: ['./ebooks.page.scss'],
})
export class EbooksPage implements OnInit {
  constructor(private soliticsService: SoliticsService,) {}
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('ebooksPage');
  }

  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }

  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }
  ebooks = [
    {
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/vault-markets-e-book-get-your-forex-foundation-solid.png',
      ebookUrl:
        'https://vaultmarkets.trade/wp-content/uploads/Vault-E-Book_1.pdf',
    },
    {
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/vault-markets-e-book-ways-to-trade-forex-today.png',
      ebookUrl:
        'https://vaultmarkets.trade/wp-content/uploads/Vault_E-book_2.pdf',
    },
    {
      imageUrl:
        'https://vaultmarkets.whitelabelbox.co.za/wp-content/uploads/2022/12/vault-markets-e-book-currency-pairs-and-how-to-trade.png',
      ebookUrl:
        'https://vaultmarkets.trade/wp-content/uploads/Vault_E-book_3-1.pdf',
    },

    // Add more ebooks as needed
  ];

  ngOnInit() {this.reportPageEnter('EbooksPage');}
}
