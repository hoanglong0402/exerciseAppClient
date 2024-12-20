import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MessageService} from "primeng/api";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, BreadcrumbModule ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy }, MessageService
    ],
    bootstrap: [AppComponent],

})
export class AppModule {}
