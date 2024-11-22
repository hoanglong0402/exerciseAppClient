import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    breadcrumbItems: MenuItem[] = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig) {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd), // Listen for navigation changes
                map(() => this.activatedRoute), // Start with the root activated route
                map(route => this.buildBreadcrumb(route)) // Build breadcrumb recursively
            )
            .subscribe(breadcrumbs => {
                this.breadcrumbItems = [{ label: 'Home', routerLink: '/' }, ...breadcrumbs];
            });
    }

    private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
        const routeConfig = route.routeConfig;

        // Check if the route has a breadcrumb
        if (routeConfig && routeConfig.data && routeConfig.data['breadcrumb']) {
            const breadcrumb = routeConfig.data['breadcrumb'];
            const routePath = routeConfig.path || '';
            url += `/${routePath}`;

            breadcrumbs.push({
                label: breadcrumb,
                routerLink: url.replace(/\/:.*$/, '') // Remove dynamic parameters like ":id" from breadcrumb links
            });
        }

        // Recursively process child routes
        if (route.firstChild) {
            return this.buildBreadcrumb(route.firstChild, url, breadcrumbs);
        }

        return breadcrumbs;
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
