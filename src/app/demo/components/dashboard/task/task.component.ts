import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../project.service";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
    providers: []
})
export class TaskComponent {
    @Input() tasks: Task[] = [];
    @Output() editTask = new EventEmitter<any>();
    @Output() deleteTask = new EventEmitter<number>();

    showConfirmDialog = false;
    selectedTask: Task | null = null;

    onEditTask(task: Task): void {
        this.editTask.emit(task);
    }

    openConfirmDialog(task: Task): void {
        this.selectedTask = task;
        this.showConfirmDialog = true;
    }

    deleteConfirmed(): void {
        if (this.selectedTask) {
            this.deleteTask.emit(this.selectedTask.id);
            this.selectedTask = null;
            this.showConfirmDialog = false;
        }
    }
}
