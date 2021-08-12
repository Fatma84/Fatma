import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

// Components
import { DBCompaniesComponent } from './companies/companies.component';
import { DBProjectsComponent } from './projects/projects.component';
import { DBUsersComponent } from './users/users.component';
import { DBTestimonialsComponent } from './testimonials/testimonials.component';
import { DBTeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      { path: '', redirectTo: 'companies', pathMatch: 'full' },
      { path: 'companies', component: DBCompaniesComponent },
      { path: 'projects', component: DBProjectsComponent },
      { path: 'users', component: DBUsersComponent },
      { path: 'testimonials', component: DBTestimonialsComponent },
      { path: 'team', component: DBTeamComponent },
      { path: '**', redirectTo: 'companies' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DBRoutingModule {}
