import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesPage } from './companies.page';

const routes: Routes = [{ path: '', component: CompaniesPage }];

@NgModule({
  declarations: [CompaniesPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CompaniesPageModule {}
