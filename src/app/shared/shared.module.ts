import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CompanyComponent } from './components/company/company.component';
import { ProjectComponent } from './components/project/project.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ToolsSvgComponent } from './components/tools-svg/tools-svg.component';
import { TeamComponent } from './components/team/team.component';

const SharedModules = [
  CompanyComponent,
  ProjectComponent,
  UserAccountComponent,
  ToolsSvgComponent,
  TeamComponent,
];

@NgModule({
  declarations: [SharedModules],
  imports: [CommonModule, SweetAlert2Module],
  exports: [SharedModules],
})
export class SharedModule {}
