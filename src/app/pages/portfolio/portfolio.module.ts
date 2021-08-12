import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioPage } from './portfolio.page';

const routes: Routes = [{ path: '', component: PortfolioPage }];

@NgModule({
  declarations: [PortfolioPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PortfolioPageModule {}
