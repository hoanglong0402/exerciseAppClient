import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService, User} from "../project.service";
import {DialogService} from "primeng/dynamicdialog";
import {TaskPopupComponent} from "../task-popup/task-popup.component";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.css',
    providers: [DialogService]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
    project: any = null;
    tasks: any[] = [];
    projectId: string = '';

    users: User[] = [];
    searchTitle: string = '';
    searchStatus: string = '';
    searchUser: string = '';
    private searchTitleSubject: Subject<string> = new Subject<string>();
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private dialogService: DialogService,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.projectId = this.route.snapshot.paramMap.get('id') || '';

        if (this.projectId) {
            this.getProjectDetails(this.projectId);
            this.getTasks(this.projectId);
        }
        this.getUsers();

        this.searchTitleSubject
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((searchValue: string) => {
                this.applyFilters();
            });
    }

    onSearchIdChange(value: string): void {
        this.searchTitleSubject.next(value); // Push changes to the Subject
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
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Task list updated'});
                this.getTasks(this.projectId);
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
            searchKeyword: this.searchTitle || null,
            taskStatus: this.searchStatus || null,
            userId: this.searchUser || null
        };

        this.projectService.getTasksByProjectId(this.projectId, filters).subscribe({
            next: (data) => (this.tasks = data),
            error: (err) => console.error('Error fetching tasks:', err)
        });
    }

    resetFilters(): void {
        this.searchTitle = '';
        this.searchStatus = '';
        this.searchUser = '';
        this.applyFilters();
    }

    handleDeleteTask(taskId: number): void {
        // Call the API to delete the task
        this.projectService.deleteTaskById(taskId).subscribe({
            next: () => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Deleted'});
                this.getTasks(this.projectId);
            },
            error: (err) => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Error when delete task'});
            }
        });
    }

    ngOnDestroy(): void {
        // Clean up subscriptions
        this.destroy$.next();
        this.destroy$.complete();
    }

}
