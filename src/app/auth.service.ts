import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { appConfig } from './app.config';


// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;
declare var firebase: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(appConfig.auth0.clientID, appConfig.auth0.domain, { auth: { params: { scope: "openid scope" } } });
  auth0 = new Auth0({ clientID: appConfig.auth0.clientID, domain: appConfig.auth0.domain })


  //Store profile object in auth class
  userProfile: Object;

  constructor(private af: AngularFire) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });


      // Set the options to retreive a firebase delegation token
      var options = {
        id_token: authResult.idToken,
        api: 'firebase',
        scope: 'openid name email displayName',
        target: appConfig.auth0.clientID
      };

      // Make a call to the Auth0 '/delegate'
      this.auth0.getDelegationToken(options, function (err, result) {
        if (!err) {
          // Exchange the delegate token for a Firebase auth token
          af.auth.login(result.id_token, {
            provider: AuthProviders.Custom,
            method: AuthMethods.CustomToken,
          });
        }
      });

    });
  };

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public getAuthToken() {
    // Return the Auth0 `id_token`
    return localStorage.getItem('id_token');
  }

  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.af.auth.logout();
    this.userProfile = undefined;
  };
}