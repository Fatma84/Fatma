import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Toast } from 'src/app/core/toast/Toast.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { CompanyService } from 'src/app/services/company.service';
import { company } from 'src/app/pages/dashboard/companies/companies.interface';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  @Input() company: company = { imageURL: '', link: '', name: '', cid: '' };
  isDeleting?: string;
  readonly adminID = environment.adminID;

  constructor(
    private companyService: CompanyService,
    private toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  deleteCompany(CID: string) {
    if (this.isDeleting) return;
    this.isDeleting = CID;

    this.companyService
      .deleteCompany(CID)
      .then((res) => {
        this.isDeleting = undefined;
        let toast = new Toast(
          'company deleted',
          'Company deleted successfully',
          2
        );
        this.toastService.addToast(toast);
      })
      .catch((err) => {
        let toast = new Toast(
          'error in deleting',
          'error in deleting company',
          2
        );
        this.toastService.addToast(toast);
        this.isDeleting = undefined;
      });
  }
}
