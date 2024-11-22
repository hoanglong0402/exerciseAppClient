import {Component, OnInit} from '@angular/core';
import {Project, ProjectService} from "./project.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './dashboard.component.html',
    styles: [
        `
      .project-management {
        padding: 16px;
      }
      .project-list {
        display: flex;
        flex-wrap: wrap;
      }
    `,
    ],
})
export class DashboardComponent implements OnInit {

    projects: Project[] = [];
    loading = true;

    constructor(private projectService: ProjectService,
                private router: Router) {}

    ngOnInit() {
        this.projectService.getProjects().subscribe({
            next: (data) => {
                this.projects = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to fetch projects:', err);
                this.loading = false;
            },
        });
    }

    navigateToDetail(id: number): void {
        this.router.navigate(['projects/', id])
    }
}
