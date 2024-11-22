import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";
import {DialogService} from "primeng/dynamicdialog";
import {TaskPopupComponent} from "../task-popup/task-popup.component";

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.css',
    providers: [DialogService]
})
export class ProjectDetailComponent implements OnInit {
    project: any = null;
    tasks: any[] = [];
    projectId: string = '';

    users: any[] = [];
    searchId: string = '';
    searchStatus: string = '';
    searchUser: string = '';

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private dialogService: DialogService
    ) {
    }

    ngOnInit(): void {
        this.projectId = this.route.snapshot.paramMap.get('id') || '';

        if (this.projectId) {
            this.getProjectDetails(this.projectId);
            this.getTasks(this.projectId);
        }
        this.getUsers();
    }

    getProjectDetails(id: string): void {
        this.projectService.getProjectById(id).subscribe({
            next: (data) => (this.project = data),
            error: (err) => console.error('Error fetching project details:', err)
        });
    }

    getTasks(id: string): void {
        this.projectService.getTasksByProjectId(id, null).subscribe({
            next: (data) => (this.tasks = data),
            error: (err) => console.error('Error fetching tasks:', err)
        });
    }

    openTaskPopup(task?: any): void {
        const ref = this.dialogService.open(TaskPopupComponent, {
            header: task ? 'Edit Task' : 'Add Task',
            width: '500px',
            data: {
                projectId: this.projectId,
                task: task || null
            }
        });

        ref.onClose.subscribe((result) => {
            if (result) {
                this.getTasks(this.projectId); // Refresh the task list after add/update
            }
        });
    }

    getUsers(): void {
        this.projectService.getUsers().subscribe({
            next: (data) => (this.users = data),
            error: (err) => console.error('Error fetching users:', err)
        });
    }

    applyFilters(): void {
        const filters = {
            id: this.searchId || null,
            status: this.searchStatus || null,
            user: this.searchUser || null
        };

        this.projectService.getTasksByProjectId(this.projectId, filters).subscribe({
            next: (data) => (this.tasks = data),
            error: (err) => console.error('Error fetching tasks:', err)
        });
    }

    resetFilters(): void {
        this.searchId = '';
        this.searchStatus = '';
        this.searchUser = '';
        this.applyFilters();
    }

}
