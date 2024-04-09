import { Injectable } from '@angular/core';

import { HttpResponse } from '@capacitor-community/http';

import { GenericService } from 'src/app/shared/services/generic.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AuthService } from './auth.service';

import { RiskAssessment } from '../models/risk-assessment.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentService extends GenericService {

  private data: RiskAssessment = new RiskAssessment();
  private assessmentEndpoint = environment.assessmentUrl;

  constructor(
    private _storageService: StorageService,
    private _authService: AuthService,
    public _loaderService: LoaderService
  ) {
    super(_loaderService);
   }

  public get getData(): RiskAssessment {
    this.data.id = this._authService.getUser;
    this.data.firstName = this._authService.getFirstName;
    this.data.lastName = this._authService.getLastName;
    this.data.email = this._authService.getEmail;
    this.data.contactNumber = this._authService.getContactNumber;

    return this.data;
  }

  public set setData(data: { [key: string]: string }) {
    Object.assign(this.data, data);
    console.log('data updated! ', this.data);
  }

  public storeData(): void {
    this._storageService.setUserPreference('assessData', JSON.stringify(this.data));
    // this._storageService.setUserPreference('assessed', 'false');
  }

  public retrieveData(): RiskAssessment {
    const data = this._storageService.getUserPreference<RiskAssessment>('assessData');

    if (!data) {
      return undefined;
    }
    this.data = data;

    return this.data;
  }

  public async getAssessmentValues(): Promise<any> {
    return fetch('../../../assets/assessment-data.json')
      .then(res => res.json());
  }

  public async getAssessmentResult(data: RiskAssessment): Promise<HttpResponse> {
    return await this.assessmentPost(
      `${this.assessmentEndpoint}/outcome`,
      data
    );
  }

  public async postVerificationResult(res: any): Promise<void> {
    const clientId = this._authService.getUser;

    await this.assessmentPost(
      `${this.assessmentEndpoint}/shufti_verification/${clientId}`,
      res
    );
  }
}
