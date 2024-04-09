import { Injectable } from '@angular/core';
import  { Capacitor } from '@capacitor/core';
import { OneSignalPlugin } from 'onesignal-cordova-plugin';

@Injectable({
  providedIn: 'root'
})

export class PushNotification {

  private oneSignal = new OneSignalPlugin();
  public notifications: any[] = [];


  constructor() {}

  public oneSignalInit(): void {
    if (Capacitor.isNativePlatform()) {
      this.oneSignal.setAppId('f7691526-c3c9-4d37-a8fe-0cf5e4258a7c');

      this.oneSignal.setNotificationOpenedHandler((jsonData) => {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          this.notifications.push(jsonData); // Store the notification data
      });

      this.oneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
          console.log('Notification received in foreground:', notificationReceivedEvent);
          let notification = notificationReceivedEvent.getNotification();
          this.notifications.push(notification); // Store the notification data

          // You can set the displayed notification's content and other options here
          notificationReceivedEvent.complete(notification);
      });

      this.oneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
          console.log('User accepted notifications: ' + accepted);
      });
    }
  }
  public createNotification(title: string, body: string): void {
    const notification = {title: title, body: body, received: new Date()};
    console.log('Creating notification:', notification);
    this.notifications.push(notification);
    console.log('Notifications after adding new one:', this.notifications);
  }
  public setUserId(id: string) {
    if (Capacitor.isNativePlatform) {
        const externalUserId = id || '00000';
        this.oneSignal.setExternalUserId(externalUserId);
    }
  }
}
