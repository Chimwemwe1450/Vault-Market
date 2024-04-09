// notifications.page.ts
import { Component, OnInit } from '@angular/core';
import { PushNotification } from 'src/app/shared/helper-classes/push-notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  private pushNotification: PushNotification;
  public notifications: any[] = [];

  constructor() {
    this.pushNotification = new PushNotification();
  }

  ngOnInit() {
    this.pushNotification.oneSignalInit();
    this.notifications = this.pushNotification.notifications;
  }
  
  public showNotificationData() {
    console.log(this.notifications);
  }
}

