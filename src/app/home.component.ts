import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { Auth } from './auth.service';
import { FirebaseService } from './firebase.service';
import { HelloWorld } from './firebase.model';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
})

export class HomeComponent {

  private helloWorld:  HelloWorld[];

  constructor(private auth: Auth, private fs: FirebaseService) {

  }

  getHelloWorld() {
    this.fs.requestHelloWorld().subscribe(data => { console.log(data); this.helloWorld = data }, err => { console.log(err) });
  }

};