import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Auth } from './auth.service';
import { FirebaseData } from './firebase.model';


@Injectable()
export class FirebaseService {

    items: FirebaseListObservable<FirebaseData[]>;

    constructor(private auth: Auth, private af: AngularFire) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                console.log('logged in');
                this.items = af.database.list('/');
            } else {
                console.log('not logged in');
                this.items = null;
            }
        });
    }
}