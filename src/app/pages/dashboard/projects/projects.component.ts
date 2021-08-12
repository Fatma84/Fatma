import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Toast } from 'src/app/core/toast/Toast.model';
import { FRAMEWORKS } from 'src/app/data/frameworks';
import { ProjectsService } from 'src/app/services/projects.service';
import { ToastService } from 'src/app/services/toast.service';
import { framework, project } from './projects.interface';

@Component({
  selector: 'dashboard-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class DBProjectsComponent implements OnInit {
  projects: project[] = [];

  readonly FRAMEWORKS: { [key: string]: framework } = FRAMEWORKS;

  projectsForm = this.fb.group({
    title: ['', Validators.required],
    logoURL: ['', Validators.required],
    date: ['', Validators.required],
    link: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
    frameworks: ['', Validators.required],
  });
  isSending: boolean = false;

  get title() {
    return this.projectsForm.get('title') as FormControl;
  }
  get priority() {
    return this.projectsForm.get('priority') as FormControl;
  }
  get logoURL() {
    return this.projectsForm.get('logoURL') as FormControl;
  }
  get date() {
    return this.projectsForm.get('date') as FormControl;
  }
  get link() {
    return this.projectsForm.get('link') as FormControl;
  }
  get description() {
    return this.projectsForm.get('description') as FormControl;
  }
  get status() {
    return this.projectsForm.get('status') as FormControl;
  }
  get frameworks() {
    return this.projectsForm.get('frameworks') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }

  onSendForm() {
    if (this.projectsForm.invalid) return;
    this.isSending = true;
    this.projectsForm.disable();

    let projectsForm: project = {
      priority: this.priority.value,
      title: this.title.value,
      logoURL: this.logoURL.value,
      date: this.date.value,
      link: this.link.value,
      description: this.description.value,
      status: this.status.value,
      frameworks: this.frameworks.value,
    };

    this.projectsService.addProject(projectsForm).then(
      (res) => {
        let toast = new Toast('project added', 'project add successfully', 2);
        this.toastService.addToast(toast);
        this.isSending = false;
        this.projectsForm.reset();
        this.projectsForm.enable();
      },
      (err) => {
        let toast = new Toast(
          'Error',
          'There is an error in adding new project',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.projectsForm.enable();
      }
    );
  }
}
