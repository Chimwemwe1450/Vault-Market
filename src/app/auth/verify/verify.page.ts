import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActionSheetController, ModalController } from '@ionic/angular';

import { VerificationService } from '../shared/services/verification.service';
import { CameraService } from '../../shared/services/camera.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from '../shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

import { VerifyResultComponent } from '../../shared/components/verify-result/verify-result.component';
import { Profile } from 'src/app/shared/models/profile.model';
import { SoliticsService } from 'src/app/shared/services/Solitics.service';
class FilesUploaded {
  idDoc: boolean;
  residenceDoc: boolean;
  verifyDoc: boolean;

  constructor() {
    this.idDoc = false;
    this.residenceDoc = false;
    this.verifyDoc = false;
  }
}

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  public fileUploadLabel = 'no image';
  public filesUploaded = new FilesUploaded();
  public verifyButton = {
    style: 'outline',
    disabled: true
  };

  constructor(
    private _verificationService: VerificationService,
    private _cameraService: CameraService,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private _alertService: AlertService,
    private router: Router,
    private soliticsService: SoliticsService,
    private _loaderService: LoaderService,
    private _storageService: StorageService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.reportPageEnter('VerifyPage');
  }

  private async reportPageEnter(pageName: string): Promise<void> {
    try {
      await this.soliticsService.reportPageEnter(pageName);
      console.log(`Reported page enter event for ${pageName} to Solitics.`);
    } catch (error) {
      console.error(`Error reporting page enter event for ${pageName}:`, error);
    }
  }


  public continueLater(): void {
    this._alertService.presentAlert(
      'Continue Later',
      'If you choose to continue later, you will only have limited access to the app until your profile is complete.',
      'Proceed',
      'Cancel',
      async () => {
        this.router.navigate(['dashboard/home']);
      },
      async () => {}
    );
  }

  public async onSubmit(): Promise<void> {
    try {
      await this._loaderService.presentLoading('Please wait while we upload your documents...');
      this.verifyButtonToggle(false);
  
      // Here we are assuming the getFile method of VerificationService which returns the uploaded document for the given type.
      const idDoc = this._verificationService.getFile('idDoc');
      const residenceDoc = this._verificationService.getFile('residenceDoc');
      const verifyDoc = this._verificationService.getFile('verifyDoc');
  
      // Storing the uploaded documents. The implementation of this may vary based on your actual storage mechanism.
      this._storageService.setUserPreference('idDoc', idDoc);
      this._storageService.setUserPreference('residenceDoc', residenceDoc);
      this._storageService.setUserPreference('verifyDoc', verifyDoc);
  
      this._storageService.setUserPreference('verified', 'true');
  
      await this._loaderService.dismissLoading();
      this.router.navigate(['dashboard']);
    } catch (error) {
      await this._loaderService.dismissLoading();
      console.error('Error during document upload:', error);
      // Show a meaningful error message to the user
    }
  }
  

  public onImagePick(docType: string): void {
    if (docType === 'verifyDoc') {
      this.onUpload(docType, 'camera');
    } else {
      this.presentActionSheet(docType);
    }
  }

  public authMe(): void {
    // this._verificationService.kycTokenGen();
    this._verificationService.kycAuth();
  }

  public async presentActionSheet(docType: string): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload Options  ',
      cssClass: 'custom-option',
      buttons: [
        {
          text: 'Take a Photo',
          icon: 'camera',
          cssClass: 'custom-option',
          handler: () => {
            this.onUpload(docType, 'camera');
            console.log('camera clicked');
          }
        },
        {
          text: 'Select a Document or Image ',
          icon: 'image',
          cssClass: 'custom-option',
          handler: () => {
            this.onUpload(docType, 'gallery');
            console.log('gallery clicked');
          }
        }
      ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    // console.log('onDidDismiss resolved with role and data', role, data);
  }


  private async onUpload(docType: string, source: string): Promise<void> {
    let base64: string;

    if (source === 'gallery') {
      base64 = await this._cameraService.fromFile();
    } else {
      base64 = await this._cameraService.fromCamera();
    }

    if (docType === 'idDoc') {
      this._verificationService.setFile = { data: base64, type: 'idDoc' };
      this.filesUploaded.idDoc = true;
    } else
    if (docType === 'residenceDoc') {
      this._verificationService.setFile = { data: base64, type: 'residenceDoc' };
      this.filesUploaded.residenceDoc = true;
    } else
    if (docType === 'verifyDoc') {
      this._verificationService.setFile = { data: base64, type: 'verifyDoc' };
      this.filesUploaded.verifyDoc = true;
    }

    if (
        (this.filesUploaded.idDoc) &&
        (this.filesUploaded.residenceDoc) &&
        (this.filesUploaded.verifyDoc)
       )
    {
      this.verifyButtonToggle(true);
    } else {
      this.verifyButtonToggle(false);
    };
  }

  private verifyButtonToggle(enable: boolean): void {
    if (enable) {
      this.verifyButton.style = 'solid';
      this.verifyButton.disabled = false;
    } else {
      this.verifyButton.style = 'outline';
      this.verifyButton.disabled = true;
    }
  }

  private async resultModal(result: boolean, error: string): Promise<void> {
    const modal = await this.modalController.create({
      component: VerifyResultComponent,
      componentProps: { result, error },
      cssClass: 'my-custom-class'
    });
    await modal.present();

    await modal.onDidDismiss()
      .then((res) => {
        console.log('data: ', res.data.data);
        if (res.data.data === 'skip') {
          this.router.navigate(['dashboard/home']);
        } else
        if (res.data.data === 'confirm') {
          this.router.navigate(['dashboard']);
        } else {
          this.filesUploaded = new FilesUploaded();
        }
      });
  }

}
