import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalController, PopoverController } from '@ionic/angular';

import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AppReviewService } from 'src/app/shared/services/app-review.service';

import { ResetPasswordPage } from '../reset-password/reset-password.page';

import { Login } from '../shared/models/login.model';
import { AuthDetails } from '../shared/models/auth-details.model';

import { EncryptHelper } from 'src/app/shared/helper-classes/encrypt-helper';
import { PushNotification } from 'src/app/shared/helper-classes/push-notification';
import { Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public rememberMe = false;
  public navigate = false;
  public logoSrc: string;
  private authDetails: AuthDetails = new AuthDetails();

  private encryptHelper = new EncryptHelper();
  private pushNotification = new PushNotification();
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private _toastService: ToastService,
    public modalController: ModalController,
    private popoverController: PopoverController,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _appReviewService: AppReviewService,
    private soliticsService: SoliticsService,
 
  ) {

  }
  ngOnDestroy() {
    // Reporting user leaving the login page to Solitics
    this.reportPageLeave('loginPage');
  }
  ngOnInit() {
    this.createForm();
    // this.setHeaderLogo();

    this.reportPageEnter('loginPage');

  }

  //tests@vaultmarkets.trade
  //Vault@12345

  //report user login 
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


  
  public onSubmit(): void {
    this.navigate = true;
  
    if (this.loginForm.valid) {
      const loginData = new Login();
      loginData.email = this.loginForm.get('emailAddress').value;
      loginData.password = this.loginForm.get('password').value;
  
      this._authService
        .logIn(loginData)
        .then((res) => {
          const pwEncrypt = this.encryptHelper.encryptPassword(
            loginData.password
          );
  
          if (res['data'].length) {
            if (res['data'][0].hasOwnProperty('user')) {
              this._storageService.setCurrentUser(res['data'][0]['user']);
              this.authDetails = {
                user: res['data'][0]['user'],
                authentication_token: res['data'][0]['authentication_token'],
                password: pwEncrypt,
                email: loginData.email,
              };
  
              const { email } = loginData;
         const memberId = loginData;
         const brand = loginData;
         const token= loginData;
         
              this.soliticsService.login(memberId,email , brand , token)
       
              

              this._appReviewService.init();
              this.pushNotification.setUserId(res['data'][0]['user']);
              this.storeAuthDetails(this.authDetails);
              this.isProfileComplete();
            }
          } else {
            this._toastService.presentToast(
              res['info']['message'],
              'toast-warning'
            );
          }
        })
        .catch((err) => {
          console.log('error: ', err);
          this._toastService.presentToast(err, 'toast-warning');
        });
    } else {
      this._toastService.presentToast(
        'Some fields are empty.',
        'toast-warning'
      );
    }
  }
  

  public async passwordResetModal(): Promise<void> {
    console.log('password reset');
    // this.dismissPopover();

    const modal = await this.modalController.create({
      component: ResetPasswordPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  public registration(): void {
    console.log('sign up');
  }

  public getRememberMe(): void {
    this.rememberMe = this._storageService.getRememberMe();
  }

  public rememberMeChange(): void {
    this.rememberMe = !this.rememberMe;
    this._storageService.setRememberMe(this.rememberMe);
  }

  public dismissPopover() {
    this.popoverController.dismiss({
      dismissed: true,
    });
  }

  // private setHeaderLogo(): void {
  //   const lightMode =
  //     this._storageService.getUserPreference<boolean>('lightMode') || false;
  //   this.logoSrc = lightMode
  //     ? '../../../assets/logo-trans.png' // Path to the light mode logo image
  //     : '../../../assets/vault-markets-logo.png'; // Path to the dark mode logo image
  // }

  private createForm(): void {
    this.loginForm = new FormGroup({
      emailAddress: new FormControl('tests@vaultmarkets.trade', {
        // validators: [Validators.required]
      }),
      password: new FormControl('Vault@12345', {
        //validators: [Validators.required]
      }),
    });
  }

  /* public onFocus(): void {
    console.log('input focus');
  } */

  private storeAuthDetails(authData: AuthDetails): void {
    this._authService.setAuthData = authData;
    this._authService.getUserData();
  }

  private isProfileComplete(): void {
    const assessmentCompleted =
      this._storageService.getUserPreference<boolean>('assessed') || false;
    const verified =
      this._storageService.getUserPreference<boolean>('verified') || false;

    if (assessmentCompleted && verified) {
      this.router.navigate(['dashboard']);
    } else if (!assessmentCompleted) {
      this.router.navigate(['auth/risk-assessment']);
    } else if (!verified) {
      this.router.navigate(['auth/verify']);
    }
  }
}
