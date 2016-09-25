import { Component } from '@angular/core';

import { Auth } from './auth.service';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  providers: [Auth, FirebaseService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private auth: Auth) {
  }
}
