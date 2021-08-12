import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { project } from 'src/app/pages/dashboard/projects/projects.interface';
import { ProjectsService } from 'src/app/services/projects.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Toast } from 'src/app/core/toast/Toast.model';
import { FRAMEWORKS } from 'src/app/data/frameworks';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: project = {
    priority: 0,
    title: '',
    date: new Date(),
    description: '',
    frameworks: [''],
    logoURL: '',
    status: 'development',
  };
  isDeleting?: string;
  adminID = environment.adminID;
  readonly frameworks = FRAMEWORKS;
  constructor(
    private projectService: ProjectsService,
    private toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  deleteCompany(PID: string) {
    if (this.isDeleting) return;
    this.isDeleting = PID;

    this.projectService
      .deleteProject(PID)
      .then((res) => {
        this.isDeleting = undefined;
        let toast = new Toast(
          'project deleted',
          'Project deleted successfully',
          2
        );
        this.toastService.addToast(toast);
      })
      .catch((err) => {
        let toast = new Toast(
          'error in deleting',
          'error in deleting project',
          2
        );
        this.toastService.addToast(toast);
        this.isDeleting = undefined;
      });
  }
}
