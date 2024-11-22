import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {ProjectDetailComponent} from "./project-detail/project-detail.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: DashboardComponent, data: {breadcrumb: 'Projects'}},
        {path: 'projects/:id', component: ProjectDetailComponent, data: {breadcrumb: 'Project detail'}}
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {
}
