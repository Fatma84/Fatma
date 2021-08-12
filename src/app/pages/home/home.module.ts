import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HomePage } from './home.page';

// Components
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { CompaniesComponent } from './companies/companies.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ConversationComponent } from './conversation/conversation.component';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [{ path: '', component: HomePage }];

@NgModule({
  declarations: [
    HomePage,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    MyWorkComponent,
    ConversationComponent,
    TestimonialsComponent,
    CompaniesComponent,
    TeamsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class HomePageModule {}
