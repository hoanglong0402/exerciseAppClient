import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PanelModule} from 'primeng/panel';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MenubarModule, SidebarModule, PanelMenuModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarVisible = true;
  menuItems: MenuItem[] = [];
  sidebarMenu: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      {label: 'Home', icon: 'pi pi-home', routerLink: '/'},
      {label: 'Profile', icon: 'pi pi-user', routerLink: '/profile'},
    ];

    this.sidebarMenu = [
      {
        label: 'Projects',
        icon: 'pi pi-folder',
        items: [
          {label: 'All Projects', icon: 'pi pi-list', routerLink: '/projects'},
          {label: 'Add Project', icon: 'pi pi-plus', routerLink: '/projects/add'},
        ],
      },
      {
        label: 'Tasks',
        icon: 'pi pi-check',
        items: [
          {label: 'All Tasks', icon: 'pi pi-list', routerLink: '/tasks'},
          {label: 'Add Task', icon: 'pi pi-plus', routerLink: '/tasks/add'},
        ],
      },
    ];
  }
}
