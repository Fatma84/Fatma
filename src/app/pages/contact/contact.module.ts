import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ContactPage } from './contact.page';

const routes: Routes = [{ path: '', component: ContactPage }];

@NgModule({
  declarations: [ContactPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ContactPageModule {}
