import {
    Component,
    OnInit,
} from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: "app-root",
  template: "<app-navbar></app-navbar><router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(private _swPush: SwPush) {}

  ngOnInit() {
    // Register the service worker
    const keys = {
      publicKey:
        "BCoL7NdPTq6qvhmci50WZnTnfI17y6BWb4jtcH8ufXZE6x8HgUthOaJlMnUHwW-U_4wPz-tHQmQ7AzDsCa9Ra3U",
      privateKey: "kJIvFYM4MBRcKLPUMfqc_3I1c6RmHuxXmPnPQkbD-tY"
    };

    this._swPush
      .requestSubscription({
        serverPublicKey: keys.publicKey
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error))
      .finally(() => console.log("complete"));
  }
}
