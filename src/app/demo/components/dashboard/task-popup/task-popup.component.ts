import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {ProjectService} from "../project.service";

@Component({
    selector: 'app-task-popup',
    templateUrl: './task-popup.component.html',
    // styleUrls: ['./task-popup.component.css']
})
export class TaskPopupComponent implements OnInit {
    task: any = { id: null, name: '', status: '', dueDate: null };
    projectId: string = '';

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private projectService: ProjectService
    ) {}

    ngOnInit(): void {
        this.projectId = this.config.data.projectId;
        if (this.config.data.task) {
            this.task = { ...this.config.data.task }; // Clone the task to avoid direct mutation
        }
    }

    saveTask(): void {
        if (this.task.id) {
            // Update task
            this.projectService.updateTask(this.projectId, this.task).subscribe({
                next: () => this.ref.close(true),
                error: (err) => console.error('Error updating task:', err)
            });
        } else {
            // Add task
            this.projectService.addTask(this.projectId, this.task).subscribe({
                next: () => this.ref.close(true),
                error: (err) => console.error('Error adding task:', err)
            });
        }
    }

    closePopup(): void {
        this.ref.close();
    }
}
