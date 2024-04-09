import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-kyc-header',
  templateUrl: './kyc-header.component.html',
  styleUrls: ['./kyc-header.component.scss'],
})
export class KycHeaderComponent implements OnInit {
  public logoSrc: string;

  constructor(private _storageService: StorageService) {
    this.setLogoSrc();
  }

  ngOnInit() {}

  private setLogoSrc(): void {
    const lightMode =
      this._storageService.getUserPreference<boolean>('lightMode') || false;
    this.logoSrc = lightMode
      ? '../../../assets/vault-markets-logo.png' // Path to the light mode logo image
      : ' ../../../assets/logo-trans.png'; // Path to the dark mode logo image
  }
}
