import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { CompanyService } from 'src/app/services/company.service';
import { company } from './companies.interface';
import { Toast } from 'src/app/core/toast/Toast.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'dashboard-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class DBCompaniesComponent implements OnInit {
  companies: company[] = [];

  companiesForm = this.fb.group({
    name: ['', [Validators.required]],
    imageURL: ['', [Validators.required]],
    link: ['', [Validators.required]],
  });
  isSending: boolean = false;

  get name() {
    return this.companiesForm.get('name') as FormControl;
  }
  get imageURL() {
    return this.companiesForm.get('imageURL') as FormControl;
  }
  get link() {
    return this.companiesForm.get('link') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((res) => {
      this.companies = res.map((e) => {
        return {
          cid: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as company;
      });
    });
  }

  onSendForm() {
    if (this.companiesForm.invalid) return;
    this.isSending = true;
    this.companiesForm.disable();

    let companiesForm: company = {
      name: this.name.value,
      imageURL: this.imageURL.value,
      link: this.link.value,
    };

    this.companyService.addCompany(companiesForm).then(
      (res) => {
        let toast = new Toast('company added', 'Company add successfully', 2);
        this.toastService.addToast(toast);
        this.isSending = false;
        this.companiesForm.reset();
        this.companiesForm.enable();
      },
      (err) => {
        let toast = new Toast(
          'Error',
          'There is an error in adding new company',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.companiesForm.enable();
      }
    );
  }
}
