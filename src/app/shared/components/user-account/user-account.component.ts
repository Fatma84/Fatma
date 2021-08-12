import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.authService.showOneTapGoogle();
  }
}
