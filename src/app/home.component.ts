import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Auth } from './auth.service';
import { FirebaseService } from './firebase.service';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent {

  constructor(private auth: Auth, private fs: FirebaseService) {

  }
};