import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { Auth } from './auth.service';
import { FirebaseData, HelloWorld } from './firebase.model';


@Injectable()
export class FirebaseService {

    items: FirebaseListObservable<FirebaseData[]>;
    private helloWorldUrl = 'http://localhost:3000/api/hello';

    constructor(private auth: Auth, private af: AngularFire, private authHttp: AuthHttp) {
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

    requestHelloWorld(): Observable<HelloWorld[]> {
        return this.authHttp.get(this.helloWorldUrl)
            .map((r: Response) =>  <HelloWorld[]> r.json());
    }
}