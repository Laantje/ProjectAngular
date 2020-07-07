import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../app/app.module';
import { environment } from '../environments/environment';

if (environment.production) {
    enableProdMode();
}

const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())