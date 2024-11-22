import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input() tasks: any[] = [];
    @Output() editTask = new EventEmitter<any>();

    onEditTask(task: any): void {
        this.editTask.emit(task);
    }
}
