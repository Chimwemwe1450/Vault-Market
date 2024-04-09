import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { EncryptHelper } from 'src/app/shared/helper-classes/encrypt-helper';
import { Login } from '../models/login.model';

import { AuthService } from './auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private encryptHelper = new EncryptHelper();

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _storageService: StorageService
  ) { }

  public async canActivate(): Promise<boolean> {

    if (this._authService.isAuthenticated()) {
      console.log('one');
      const user = this._authService.getUser;
      const token = this._authService.getToken;

      if (user && token) {
        console.log('two');
        const validToken: boolean = await this._authService.checkToken();

        if (validToken) {
          console.log('three');
          return true;

        } else {
          if (this._storageService.getRememberMe()) {
            console.log('four');
            let newToken: string;
            const tokenRes = await this._authService.getAuthToken();

            if (tokenRes['success'] === true) {
              console.log('five');
              newToken = tokenRes['data'][0]['token'];

              this._authService.setToken = newToken;
              return true;

            } else {
              const email = this._storageService.getUserPreference<string>('email');
              const encryptedPw = this._storageService.getUserPreference<string>('password');
              const pw = this.encryptHelper.decryptPassword(encryptedPw);
              const loginData: Login = {
                  email,
                  password: pw
              };

              this._authService.logIn(loginData)
                .then(res => {
                  console.log('six');
                  const updatedToken = res['data'][0]['authentication_token'];
                  this._authService.setToken = updatedToken;

                  return true;
                })
                .catch(err => {
                  console.log('seven');
                  localStorage.clear();
                  this.router.navigate(['auth/login']);
                  return false;
                });

                return true;
            }
          } else {
            console.log('eight');
            localStorage.clear();
            this.router.navigate(['auth/login']);
            return false;
          }
        }
      } else {
        console.log('nine');
        localStorage.clear();
        this.router.navigate(['auth/login']);
        return false;
      }
    } else {
      console.log('ten');
      this.router.navigate(['auth/login']);
      return false;
    }
  }

}
