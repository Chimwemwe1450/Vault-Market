import { Component, OnInit } from '@angular/core';

import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(  private soliticsService: SoliticsService,) { }

  ngOnInit() {
    this.reportPageEnter('ContactPage');
  }
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
    this.reportPageLeave('contactPage');
  }
  private async reportPageLeave(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageLeave(pageName);
      console.log(`Reported page leave event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page leave event for ${pageName}:`, error);
    }
  }

  public showChat(): void {
    const showSupportChat = () => {
      (window as any).Freshchat.showConversations();
    };
    showSupportChat();
  }

}
