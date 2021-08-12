import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TestimonialsPage } from './testimonials.page';

const routes: Routes = [{ path: '', component: TestimonialsPage }];

@NgModule({
  declarations: [TestimonialsPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TestimonialsPageModule {}
