import {
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  public notificationsStatus = Notification.permission;

  constructor(private _router: Router, public authService: AuthService) {}

  logout(event: Event) {
    this.authService.logout();
    this._router.navigate(["/login"]);
  }

  onNotificationsRequestClick() {
    Notification.requestPermission(status => {
      this.notificationsStatus = status;
      console.log("Notification permission status:", status);
    });
  }

  onNotificationsDisableClick() {
    // Nothing to do here. The Notification API doesn't have an option to remove permission
    // The user must go in browser settings to remove the premission
    // chrome://settings/content/notifications
  }

  onNotificationsDeniedClick() {
    // Nothing to do here. The Notification API doesn't have an option to request again the permission
    // The user must go in browser settings to remove the denied permission
    // chrome://settings/content/notifications
  }
}
