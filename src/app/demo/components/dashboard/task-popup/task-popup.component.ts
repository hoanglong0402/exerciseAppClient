import {Component, OnInit, Inject} from '@angular/core';
import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ProjectService, Task, User} from "../project.service";

@Component({
    selector: 'app-task-popup',
    templateUrl: './task-popup.component.html',
    styleUrl: './task-popup.component.css',
})
export class TaskPopupComponent implements OnInit {
    task: Task = {
        id: null,
        projectId: null,
        assignedTo: null,
        title: null,
        description: "",
        status: null,
        assignedUserName: null
    };
    projectId: number = null;
    isEditMode: boolean = false;
    users: User[] = [];
    statusOptions = [
        {label: 'NEW', value: 'NEW'},
        {label: 'OPEN_FOR_DEV', value: 'OPEN_FOR_DEV'},
        {label: 'DONE', value: 'DONE'},
    ];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private projectService: ProjectService,
    ) {
    }

    ngOnInit(): void {
        this.loadUsers();
        this.projectId = this.config.data.projectId;

        if (this.config.data.task) {
            this.task = {...this.config.data.task}; // Clone the task to avoid direct mutation
            console.log(this.task.id)
            console.log(!!this.task.id)
            this.isEditMode = !!this.task.id;
        }
    }

    loadUsers(): void {
        this.projectService.getUsers().subscribe((data) => {
            this.users = data;
        });
    }

    saveTask(): void {
        this.task.projectId = this.projectId;
        this.projectService.upsertTask(this.task).subscribe((response) => {
                this.closePopup();
                this.ref.close(true);
            });
    }

    closePopup(): void {
        this.ref.close(false);
    }
}
