import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu/menu.component';

import { AppRoutingModule } from './app-routing.module';
import { ResetPasswordPageModule } from './auth/reset-password/reset-password.module';
import { PasswordConfirmationModule } from './shared/components/password-confirmation/password-confirmation.module';
import { VerifyResultModule } from './shared/components/verify-result/verify-result.module';
import { HeaderModule } from '../app/shared/components/header/header.module';
import { FooterModule } from '../app/shared/components/footer/footer.module';
import { SearchSelectListModule } from './shared/components/search-select-list/search-select-list.module';

import { AuthInterceptorService } from './auth/shared/services/auth-interceptor.service';

import { IonicConfig } from '@ionic/core';
import { Capacitor } from '@capacitor/core';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { PushNotification } from './shared/helper-classes/push-notification';
import { SoliticsService } from './shared/services/Solitics.service';
let deviceMode: IonicConfig['mode'] = 'md';

console.log('cappy: ', Capacitor.getPlatform());
if (Capacitor.getPlatform() === 'ios') {
  deviceMode = 'ios';
}

@NgModule({
  declarations: [AppComponent, MenuComponent, ExamplePdfViewerComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      mode: deviceMode,
    }),
    AppRoutingModule,
    ResetPasswordPageModule,
    PasswordConfirmationModule,
    VerifyResultModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    SearchSelectListModule,
  ],
  providers: [
    SoliticsService,
    {
      provide: [RouteReuseStrategy ], 
      useClass: IonicRouteStrategy,
      
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AppRate,
    PushNotification,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
