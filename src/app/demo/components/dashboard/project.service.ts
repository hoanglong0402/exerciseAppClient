import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private baseUrl = 'http://ec2-52-77-51-47.ap-southeast-1.compute.amazonaws.com:8081/api';

    constructor(private http: HttpClient) {
    }

    getProjects(): Observable<Project[]> {
        const mockProjects: Project[] = [
            {
                "id": 1000,
                "name": "Project January",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "ownerId": 1000,
                "ownerName": "MinhNguyen"
            },
            {
                "id": 1001,
                "name": "Project February",
                "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "ownerId": 1001,
                "ownerName": "LanPham"
            },
            {
                "id": 1002,
                "name": "Project March",
                "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                "ownerId": 1002,
                "ownerName": "HanhTran"
            },
            {
                "id": 1003,
                "name": "Project April",
                "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
                "ownerId": 1003,
                "ownerName": "TuanLe"
            },
            {
                "id": 1004,
                "name": "Project May",
                "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
                "ownerId": 1004,
                "ownerName": "HoaDang"
            }
        ];
        return of(mockProjects);
        // return this.http.get<Project[]>(`${this.baseUrl}/projects`);
    }

    getProjectById(id: string): Observable<Project> {
        const mockProjects: Project =
            {
                "id": 1004,
                "name": "Project May",
                "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
                "ownerId": 1004,
                "ownerName": "HoaDang"
            };
        return of(mockProjects);
        // return this.http.get(`${this.baseUrl}/projects/${id}`);
    }

    getTasksByProjectId(projectId: string, param: any): Observable<Task[]> {
        const mockProjects: Task[] =
            [
                {
                    "id": 1000,
                    "projectId": 1001,
                    "assignedTo": 1001,
                    "assignedUserName": "LanPham",
                    "title": "Title tasks",
                    "description": "no description",
                    "status": "NEW"
                },
                {
                    "id": 1001,
                    "projectId": 1001,
                    "assignedTo": 1001,
                    "assignedUserName": "LanPham",
                    "title": "Title tasks 231321",
                    "description": "no description 3232",
                    "status": "NEW"
                },
                {
                    "id": 1002,
                    "projectId": 1001,
                    "assignedTo": 1001,
                    "assignedUserName": "LanPham",
                    "title": "Title tasks 1231",
                    "description": "no description 2323",
                    "status": "NEW"
                }
            ];
        return of(mockProjects);
        // TODO add parameter
        // return this.http.get<any[]>(`${this.baseUrl}/tasks/projectId/${projectId}`);
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
