// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const urls = {
    api: 'https://alounak.com/admin/api',
    cdn: 'https://storage.backtory.com/Alounak/',
    loginAs: 'https://alounak.com/panel/#/default?loginAs=',
    report: 'https://alounak.com/admin',
    userApi: 'https://userapi.alounak.com',
    //   paneltUrl:'https://alounak.com/panel',
};

export const environment = {
    production: false,
    serviceWorker: false,
    urls,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
