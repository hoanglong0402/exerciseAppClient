import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
}

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private baseUrl = 'https://5f2a52016ae5cc001642241a.mockapi.io';

    constructor(private http: HttpClient) {}

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.baseUrl}/tasks`);
    }

    getProjectById(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/tasks/${id}`);
    }

    getTasksByProjectId(projectId: string, param: any): Observable<any[]> {
        // TODO add parameter
        return this.http.get<any[]>(`${this.baseUrl}/tasks`);
    }

    addTask(projectId: string, task: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/projects/${projectId}/tasks`, task);
    }

    updateTask(projectId: string, task: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/projects/${projectId}/tasks/${task.id}`, task);
    }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/users`);
    }
}
