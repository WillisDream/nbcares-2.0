// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  login_url: 'http://localhost:3000/api/',
  firebaseConfig : {
    apiKey: "AIzaSyCRrXxhfZTXKsFTXI19jauu9hW13VdlMIU",
    authDomain: "nbcaresapp.firebaseapp.com",
    projectId: "nbcaresapp",
    storageBucket: "nbcaresapp.appspot.com",
    messagingSenderId: "477710309782",
    appId: "1:477710309782:web:de7319b70a6e3bf65325b7",
    measurementId: "G-78LWV0W15V"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
