import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export interface Project {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    ownerName: string;
}

export interface Task {
    id: number;
    projectId: number;
    assignedTo: number;
    assignedUserName: string;
    title: string;
    description: string;
    status: string;
}

export interface User {
    id: number;
    userName: string;
    email?: string;
    role?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private baseUrl = 'http://ec2-52-77-51-47.ap-southeast-1.compute.amazonaws.com:8081/api';

    constructor(private http: HttpClient) {
    }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.baseUrl}/projects`);
    }

    getProjectById(id: string): Observable<Project> {
        return this.http.get<Project>(`${this.baseUrl}/projects/${id}`);
    }

    deleteTaskById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
    }

    getTasksByProjectId(projectId: string, param: any): Observable<Task[]> {
        let params = new HttpParams();
        for (const key in param) {
            if (param.hasOwnProperty(key) && param[key] !== null && param[key] !== undefined) {
                params = params.set(key, param[key]);
            }
        }

        return this.http.get<Task[]>(`${this.baseUrl}/tasks/project/${projectId}`, { params });
    }

    upsertTask(task: Task): Observable<any> {
        if (task.status === "") {
            task.status = null;
        }
        return this.http.post(`${this.baseUrl}/tasks`, task);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }
}
