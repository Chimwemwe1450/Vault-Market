import { Component, OnInit, ViewChild } from '@angular/core';

import { fadeAnimation } from '../../shared/animations/animation-styles';
import { MenuComponent } from 'src/app/menu/menu/menu.component';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  animations: [fadeAnimation],
})
export class ProfilePage implements OnInit {
  @ViewChild(MenuComponent) menuComponent: MenuComponent;

  constructor(private soliticsService: SoliticsService) {}
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('ProfilePage');
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

  ngOnInit() { this.reportPageEnter('ProfilePage');}
}
