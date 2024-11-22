import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {DashboardComponent} from "./app/demo/components/dashboard/dashboard.component";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

bootstrapApplication(DashboardComponent, {
    providers: [provideHttpClient(), provideRouter([])],
}).catch((err) => console.error(err));
