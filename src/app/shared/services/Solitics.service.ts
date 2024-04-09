import { Injectable } from '@angular/core';

@Injectable()
export class SoliticsService {
  public get getIsLoggedIn() {
    try {
      return JSON.parse(localStorage.getItem('SOLITICS_CONFIGURATION') || '{}')?.hashedSubscriberId;
    } catch (e) {
      return null;
    }
  }

  // user report login 
  public login(memberId: any, email: any, brand: any, token: any): void {
    if (window.$solitics && window.$solitics.onLoginSuccess) {
      window.$solitics.onLoginSuccess(memberId, email, brand, token);
    }
  }

  public logout(): void {
    if (window.$solitics && window.$solitics.onLogout) {
      window.$solitics.onLogout();
    }
  }

  // user report actions 
  public reportPageEnter(pageName: string, customFields: any = {}): void {
    if (window.$solitics && window.$solitics.onPageEnter) {
      window.$solitics.onPageEnter(pageName, customFields);
    }
  }

  public reportPageLeave(pageName: string, customFields: any = {}): void {
    if (window.$solitics && window.$solitics.onPageLeave) {
      window.$solitics.onPageLeave(pageName, customFields);
    }
  }
}
