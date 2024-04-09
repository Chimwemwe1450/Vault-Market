import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { FabMenuModule } from 'src/app/shared/components/fab-menu/fab-menu.module';
import { CountrySelectListModule } from 'src/app/shared/components/country-select-list/country-select-list.module';
import { AnimatedIconsModule } from 'src/app/shared/components/animated-icons/animated-icons.module';

import { ProfilePage } from './profile.page';
import { PfTab1Component } from '../profiletabs/pf-tab1/pf-tab1.component';
import { PfTab2Component } from '../profiletabs/pf-tab2/pf-tab2.component';

import { ProfileCompletionComponent } from 'src/app/shared/components/profile-completion/profile-completion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    FabMenuModule,
    CountrySelectListModule,
    AnimatedIconsModule,
  ],
  declarations: [
    ProfilePage,
    ProfileCompletionComponent,
    PfTab1Component,
    PfTab2Component,
  ],
})
export class ProfilePageModule {}
