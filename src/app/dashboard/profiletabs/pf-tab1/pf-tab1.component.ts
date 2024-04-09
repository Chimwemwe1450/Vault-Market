import { Component, OnInit } from '@angular/core';

import { MainService } from 'src/app/shared/services/main.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';

import { Profile } from 'src/app/shared/models/profile.model';



class FileBundle {
  idDoc: File;
  residenceDoc: File;
  verifyDoc: File;
  image?: File;
}

@Component({
  selector: 'app-pf-tab1',
  templateUrl: './pf-tab1.component.html',
  styleUrls: ['./pf-tab1.component.scss'],
})
export class PfTab1Component implements OnInit {
  public data: Profile = new Profile();
  public profileImageUrl: string;
  public new_profile_image_url: string;
  public filesToUpload = new FileBundle();
  public verifyButton = {
    style: 'outline',
    disabled: true,
  };

  constructor(
    private _mainService: MainService,
    private _authService: AuthService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {}

  public onAvatarUpload(event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files[0] as File;
    this.filesToUpload.image = file;
  
    // Get the file name
    const fileName = file.name;
    console.log('Uploaded file name:', fileName);
  
    this.uploadAvatar();
  }
  
  public async uploadAvatar(): Promise<void> {
    if (!this.filesToUpload.image) {
      this._toastService.presentToast(
        'Please select an image file to upload.',
        'toast-warning'
      );
      return;
    }
  
    try {
      const response = await this._mainService.userProfileImageUpload1(
        this.filesToUpload.image
      );
      console.log('success: ', JSON.stringify(response));
      this._toastService.presentToast(
        'Profile image uploaded successfully.',
        'success'
      );
  
      // Save the response to localStorage
      localStorage.setItem('profileImageResponse', JSON.stringify(response));
  
      // Update the profileImageUrl property with the new image URL
      // Replace 'new_profile_image_url' with the actual property name in the response
      this.profileImageUrl = this.new_profile_image_url;
    } catch (error) {
      console.log('error: ', error);
      if (error.status === 403) {
        this._toastService.presentToast(
          'You do not have permission to perform this action.',
          'toast-warning'
        );
      } else {
        this._toastService.presentToast(
          'Profile image upload failed.',
          'toast-warning'
        );
      }
    }  
  }

  public onUpload(event, docType: string): void {
    if (docType === 'idDoc') {
      this.filesToUpload.idDoc = event.target.files[0] as File;
      console.log('file: ', this.filesToUpload.idDoc);
      // this.addRegistry.get('upload').setValue(file);
    } else if (docType === 'residenceDoc') {
      this.filesToUpload.residenceDoc = event.target.files[0] as File;
      console.log('file: ', this.filesToUpload.residenceDoc);
      // this.addRegistry.get('upload').setValue(file);
    } else if (docType === 'verifyDoc') {
      this.filesToUpload.verifyDoc = event.target.files[0] as File;
      console.log('file: ', this.filesToUpload.verifyDoc);
      // this.addRegistry.get('upload').setValue(file);
    }

    if (
      this.filesToUpload.idDoc &&
      this.filesToUpload.residenceDoc &&
      this.filesToUpload.verifyDoc
    ) {
      this.verifyButton.style = 'solid';
      this.verifyButton.disabled = false;
    } else {
      this.verifyButton.style = 'outline';
      this.verifyButton.disabled = true;
    }
  }
}
