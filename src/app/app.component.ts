import { Component, OnInit } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { observable } from "rxjs";

@Component({
  selector: "app-root",
  template: "<app-navbar></app-navbar><router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(private _swPush: SwPush) {}

  ngOnInit() {
    const keys = {
      publicKey:
        "BD0LPxturk3ANv78KbteouZoWmkwo44_saX_5gyPF-WPfblvjJ0L92Ncie6mXB-nQEgBH_uL_BVK-9pKgvkF46k",
      privateKey: "482FBEMauXpl-tHNa5sJUnzO0sIMRSSzqqd5-Ory_eQ"
    };
    this._swPush
      .requestSubscription({
        serverPublicKey: keys.publicKey
      })
      .then(result => {
        console.log(result);
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification("Titluuuuu mboss", {
            body: "Buzz! Buzz!",
            // icon: "../images/touch/chrome-touch-icon-192x192.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample"
          });
        });
      })
      .catch(error => console.log(error))
      .finally(() => console.log("complete"));
  }
}
