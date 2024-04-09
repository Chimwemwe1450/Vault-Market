import { Injectable } from '@angular/core';

import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { FilePicker, PickFilesResult } from '@robingenz/capacitor-file-picker';

interface ICapturedImage {
  filepath: string;
  webviewPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public photo: ICapturedImage;
  public croppedImage: string;

  constructor() { }

  public async fromCamera(): Promise<string> {
    const selectedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      direction: CameraDirection.Front,
      quality: 60
    });

    this.photo = {
      filepath: 'soon...',
      webviewPath: selectedPhoto.webPath
    };

    // Convert and return base64 value
    const base64Image = await this.readAsBase64(selectedPhoto);

    return base64Image;
  }

  public async fromGallery(): Promise<string> {
    const selectedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 60
    });

    this.photo = {
      filepath: 'soon...',
      webviewPath: selectedPhoto.webPath
    };

    // Convert and return base64 value
    const base64Image = await this.readAsBase64(selectedPhoto);

    return base64Image;
  }

  public async fromFile(): Promise<string> {
    const file: PickFilesResult = await FilePicker.pickFiles({
        types: ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'],
        multiple: false,
      });
    const mimeType = file.files[0].mimeType;
    const base64String = file.files[0].data;
    const base64 = `data:${mimeType};base64,${base64String}`;

    return base64;
  }


  private async readAsBase64(photo: Photo): Promise<string> {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
