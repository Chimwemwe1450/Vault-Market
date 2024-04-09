import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';

import { PushNotification } from './shared/helper-classes/push-notification';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public toolbar = {
    display: false,
    isIos: false
  };
  public activeTab: number;
  private pushNotification = new PushNotification();

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.hideSplash();
    this.iosOffset();
    this.pushNotification.oneSignalInit();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (
            (event.url === '/auth/login') ||
            (event.url === '/auth/register') ||
            (event.url === '/auth/verify') ||
            (event.url === '/auth/risk-assessment')
        ) {
          this.toolbar.display = false;
        } else {
          this.toolbar.display = true;
        };
      }

      if (event instanceof NavigationEnd) {
          this.activeScreen(this.trimPath(event));
      }
    });
  }

  public pageOffset(): string {
    if (this.toolbar.display) {
      if (this.toolbar.isIos) {
        return 'ios-offset';
      } else {
        return 'offset';
      }
    }
    return;
  }

  private async hideSplash(): Promise<void> {
     setTimeout(async () => {
      await SplashScreen.hide({
        fadeOutDuration: 1000
      });
     }, 2000);
  }

  private iosOffset(): void {
    const platform = Capacitor.getPlatform();
    if (platform === 'ios') {
      this.toolbar.isIos = true;
    } else {
      this.toolbar.isIos = false;
    }
  }

  private activeScreen(screen: string): void {
    switch (screen) {
      case '':
        this.activeTab = 0;
        break;
      case 'home':
        this.activeTab = 0;
        break;
      case 'trading-accounts':
        this.activeTab = 1;
        break;
        case 'tools':
          this.activeTab = 2;
          break; 
  
      case 'history':
        this.activeTab = 3;
        break;
      case 'profile':
        this.activeTab = 4;
        break;
      default:
        this.activeTab = undefined;
    }
  }

  private trimPath(e: NavigationEnd): string {
    const regex = /dashboard|\//g;
    const rawPath = e.url;
    let screen = rawPath.replace(regex, '');

    if (screen.includes('?')) {
      const withParams = screen.split('?');
      screen = withParams[0];
    }
    return screen;
  }
}
