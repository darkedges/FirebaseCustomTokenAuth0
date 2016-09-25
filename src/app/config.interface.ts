export interface Auth0Configuration {
    clientID: string,
    domain: string
}

export interface FirebaseConfiguration {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    storageBucket: string,
    messagingSenderId: string
}

export interface ApplicationConfiguration {
    auth0: Auth0Configuration,
    firebase: FirebaseConfiguration
}