import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { company } from '../../dashboard/companies/companies.interface';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  companies: company[] = [];
  isLoading: boolean = true;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((res) => {
      this.companies = res.map((e) => {
        return {
          cid: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as company;
      });
      this.isLoading = false;
    });
  }
}
