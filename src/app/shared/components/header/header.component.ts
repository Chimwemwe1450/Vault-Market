import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';

import { AlertService } from '../../services/alert.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pageTitle: string;

  public modeIcon: string;
  public profileComplete = {
    complete: false,
    type: {
      riskAssess: false,
      verified: false,
    },
  };

  public logoSrc: string;

  private lightMode = true;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private titleService: Title,
    private _storageService: StorageService,
    private _alertService: AlertService
  ) {}

  public displayMode(): void {
    this.lightMode = !this.lightMode;
    this.setMode();
    this.setLogoSrc();
  }

  public notifications(): void {
    this.router.navigate(['dashboard/notifications']);
  }

  public profileCompletion(): void {
    let route: string;
    if (!this.profileComplete.type.riskAssess) {
      route = 'auth/risk-assessment';
    } else {
      route = 'auth/verify';
    }

    this._alertService.presentAlert(
      'Complete your Profile',
      'You need to complete your profile in order to get access to the entire app.',
      'Proceed',
      'Cancel',
      async () => {
        this.router.navigate([route]);
      },
      async () => {}
    );
  }

  public showChat(): void {
    const showSupportChat = () => {
      (window as any).Freshchat.showConversations();
    };
    showSupportChat();
  }

  ngOnInit() {
    this.restoreDisplayMode();
    this.isProfileComplete();
    this.setLogoSrc();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pageTitle = this.getPageTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join(' | ');
        this.titleService.setTitle(this.pageTitle);
      }
    });
  }

  private setLogoSrc(): void {
    this.logoSrc = this.lightMode
      ? '../../../assets/logo-trans.png' // Path to the light mode logo image
      : '../../../assets/vault-markets-logo.png'; // Path to the dark mode logo image
  }

  private getPageTitle(state: any, parent: any) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      if (parent.routeConfig.path !== '') {
        data.push(parent.snapshot.data.title);
      }
    }

    if (state && parent) {
      data.push(...this.getPageTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  private restoreDisplayMode(): void {
    this.lightMode =
      this._storageService.getUserPreference<boolean>('lightMode') || false;
    this.setMode();
  }

  private setMode(): void {
    if (this.lightMode) {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
      this.modeIcon = 'moon';
      this._storageService.setUserPreference('lightMode', 'true');
    } else {
      this.renderer.removeAttribute(document.body, 'color-theme');
      this.modeIcon = 'sunny';
      this._storageService.setUserPreference('lightMode', 'false'); // Modified this line to set lightMode to false
    }
  }

  private isProfileComplete(): void {
    const assessmentCompleted =
      this._storageService.getUserPreference<boolean>('assessed') || false;
    const verified =
      this._storageService.getUserPreference<boolean>('verified') || false;

    if (assessmentCompleted && verified) {
      this.profileComplete.complete = true;
    } else {
      this.profileComplete.complete = false;
    }

    this.profileComplete.type.riskAssess = assessmentCompleted;
    this.profileComplete.type.verified = verified;
  }
}
