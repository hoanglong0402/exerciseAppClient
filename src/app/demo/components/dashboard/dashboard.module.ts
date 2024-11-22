import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard.component';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DashboardsRoutingModule} from './dashboard-routing.module';
import {ProjectManagementComponent} from "./project-management/project-management.component";
import {TaskComponent} from "./task/task.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {TaskPopupComponent} from "./task-popup/task-popup.component";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        DropdownModule,
        InputTextModule
    ],
    declarations: [DashboardComponent, ProjectManagementComponent, ProjectDetailComponent, TaskComponent, TaskPopupComponent],
})
export class DashboardModule {
}
