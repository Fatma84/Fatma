import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { DBRoutingModule } from './dashboard.routing';

// Pages
import { DashboardPage } from './dashboard.page';

// Components
import { DBProjectsComponent } from './projects/projects.component';
import { DBCompaniesComponent } from './companies/companies.component';
import { DBUsersComponent } from './users/users.component';
import { DBTestimonialsComponent } from './testimonials/testimonials.component';
import { DBTeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    DashboardPage,
    DBCompaniesComponent,
    DBProjectsComponent,
    DBUsersComponent,
    DBTestimonialsComponent,
    DBTeamComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, DBRoutingModule],
})
export class DashboardPageModule {}
