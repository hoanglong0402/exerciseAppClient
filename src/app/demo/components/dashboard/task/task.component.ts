import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../project.service";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input() tasks: Task[] = [];
    @Output() editTask = new EventEmitter<any>();

    onEditTask(task: Task): void {
        this.editTask.emit(task);
    }
}
