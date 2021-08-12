import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AboutPage } from './about.page';

const routes: Routes = [{ path: '', component: AboutPage }];

@NgModule({
  declarations: [AboutPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AboutPageModule {}
