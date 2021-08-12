import { Component, OnInit } from '@angular/core';

import { ProjectsService } from 'src/app/services/projects.service';
import { project } from '../../dashboard/projects/projects.interface';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss'],
})
export class MyWorkComponent implements OnInit {
  projects: project[] = [];
  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }
}
