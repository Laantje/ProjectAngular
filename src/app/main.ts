import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../app/app.module';
import { environment } from '../environments/environment';

if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/ngsw-worker.js');
    }
  }).catch(err => console.log(err));

const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())