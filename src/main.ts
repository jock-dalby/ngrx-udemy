import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

const debuggerOn = true;

/**** Add a custom debug utility function to Observable methods. ***/

Observable.prototype.debug = function(message: string) {
  return this.do(
    nextValue => {
     debuggerOn ? console.log(message, nextValue) : null;
    },
    error => {
      debuggerOn ? console.log(message, error) : null;
    },
    () => {
      debuggerOn ? console.log('Observable completed - ', message) : null;
    }
  );
};

// This will merge our declarations with the declarations that already exist in 'rxjs/Observable' therefore adding a debug method.
declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
    // debug method takes any number of any type of argument and returns an Observable of the same type.
  }
}

/*** END Debug Utility function ***/

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
