import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  constructor(private modalController: ModalController,    private soliticsService: SoliticsService,
  ) {}
  pdfData = {
    name1: {
      status: false,
      url: '../../../assets/pdfs/Vaultmarkets-Pty-Ltd-AML-Policy-v2.0-Updated-11-Oct-2021.pdf',
    },
    name2: {
      status: false,
      url: '../../../assets/pdfs/Vaultmarkets-Pty-Ltd-Client-Agreement-v2.0-Updated-11-Oct-2021.pdf',
    },
    name3: {
      status: false,
      url: '../../../assets/pdfs/Complaints-Management-Policy.pdf',
    },
    name4: {
      status: false,
      url: '../../../assets/pdfs/Vaultmarkets-Pty-Ltd-Privacy-Policy-v2.0-Updated-11-Oct-2021.pdf',
    },
    name5: {
      status: false,
      url: '../../../assets/pdfs/Vaultmarkets-Pty-Ltd-Risk-Disclosure-v2.0-Updated-11-Oct-2021 (1).pdf',
    },
    name6: {
      status: false,
      url: '../../../assets/pdfs/Vaultmarkets-Pty-Ltd-Website-Disclaimers-v2.0-Updated-11-Oct-2021-2.pdf',
    },
  };

  ngOnInit() {this.reportPageEnter('AboutPage');}
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('aboutPage');
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
  public dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  public setStatusToTrue(name: string) {
    this.pdfData[name].status = true;
  }

  public setStatusToFalse(name: string) {
    this.pdfData[name].status = false;
  }
 
}
