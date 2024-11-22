import {Component, Input} from '@angular/core';
import {Project} from "../project.service";

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.css'
})
export class ProjectManagementComponent {
    @Input() project!: Project;
}
