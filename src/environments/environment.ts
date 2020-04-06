// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientID: "keLY2qhpTgZcwIxMvtiEuymOhEFifkWZ", // from auth0 'YOUR-AUTH0-CLIENT-ID',
    domain: "https://vic-horodnychyy.eu.auth0.com/", // e.g., https://you.auth0.com/  'YOUR-AUTH0-DOMAIN',
    audience: "http://localhost:3000", // e.g., http://localhost:3001  'YOUR-AUTH0-API-IDENTIFIER', /
    redirect: "http://localhost:4200/callback",
    scope: "openid profile email",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
