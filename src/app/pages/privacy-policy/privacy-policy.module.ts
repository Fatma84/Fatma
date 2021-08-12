import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPolicyPage } from './privacy-policy.page';

const routes: Routes = [{ path: '', component: PrivacyPolicyPage }];

@NgModule({
  declarations: [PrivacyPolicyPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PrivacyPolicyPageModule {}
