import { Component } from '@angular/core';
import { Auth } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent {
  items = null;
  itemsSubscription = null;

  constructor(private auth: Auth, private af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log('logged in');
        this.itemsSubscription = af.database.list('/').subscribe((itemParamenter) => {
          // .subscribe() because asyncronous response
          this.items = itemParamenter;
        });
      } else {
        console.log('not logged in');
        if (this.itemsSubscription != null) {
          this.itemsSubscription.unsubscribe();
          this.items = null;
        }
      }
    });
  }
};