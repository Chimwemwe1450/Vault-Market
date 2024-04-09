import { Injectable } from '@angular/core';

import { FileBundle } from '../models/file-bundle.model';

import { environment } from 'src/environments/environment';

import { RiskAssessmentService } from './risk-assessment.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  private baseUrl = environment.verifyUrl;
  private token = btoa('55cf14a0972593476da6b38a1bc55fc8a51666771015729e056e1a08d280837e:De4HSNiJLoCH9wEhjSuFXgbrg2X0OC4d');
  private reqReference: string;
  private files = new FileBundle();

  constructor(
    private _riskAssService: RiskAssessmentService
  ) {}

  set setFile(file: { data: string; type: string }) {
    this.files[file.type] = file.data;
  };

  getFile(docType: string): string {
    return this.files[docType];
  }
  
  public async performKyc(address: string): Promise<Response> {
    const payload = {
      reference: this.reqReferenceGen(),
      face: {},
      document: {},
      address: {},
    };

    /*Get face sample proof Base64*/
    payload.face = {
      proof: this.files.verifyDoc
    };

    //get Document proof base64

    //Use this key if you want to perform document verification with OCR
    payload.document = {
      proof: this.files.idDoc
    };

    //Use this key if you want to perform address verification with OCR
    payload.address = {
      proof: this.files.residenceDoc,
      full_address: address,
      supported_types: ['utility_bill','passport','bank_statement']
    };

    //Use this key if you want to perform background checks verification
    /* payload['background_checks'] = {
      name : {
        first_name  : 'Your first name',
        middle_name : 'Your middle name',
        last_name   : 'Your last name'
      },
      dob : '1994-10-03'
    }; */

    const response = await fetch(this.baseUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    await this._riskAssService.postVerificationResult(data);
    console.log('SHUFTI RES: ', JSON.stringify(data));

    return data;
  }

  public kycTokenGen(): void {
    fetch(`${this.baseUrl}get/access/token`,
      {
        method : 'post',
        headers : {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${this.token}`
        }
      })
        .then(response => response.json())
        .then(data => data);
  }

  public kycAuth(): void {
    const payload = {
      reference         : this.reqReferenceGen(),
      callback_url      : 'https://yourdomain.com/profile/sp-notify-callback',
      email             : 'johndoe@example.com',
      country           : 'GB',
      language          : 'EN',
      verification_mode : 'any',
    };
    payload['face'] = {
      proof : ''
    };

    // const generatedToken = 'MWI3OGM5M2VhY2ZkZGRkYTM4OGM1OGJkNjgxZDc2ODVmM2IwNmYwMA==';
    fetch(this.baseUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.token}`
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => data);
  }

  public async convertImgToBase64URL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onerror = reject;
      reader.onload = () => {
          console.log('file: ', reader.result);
          resolve(reader.result as string);
      };

    });
  }


  private reqReferenceGen(): string {
    this.reqReference = `SP_REQUEST_${Math.random()}`;

    return this.reqReference;
  }

}
