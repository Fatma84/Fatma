import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ServicesPage } from './services.page';

const routes: Routes = [{ path: '', component: ServicesPage }];

@NgModule({
  declarations: [ServicesPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ServicesPageModule {}
