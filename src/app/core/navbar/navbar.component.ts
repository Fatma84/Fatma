import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { environment } from 'src/environments/environment';

interface link {
  url: string;
  title: string;
  isActive: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isDarkMode: boolean = false;
  isMenuOpened: boolean = false;

  links: link[] = [];

  private sub$: Subscription[] = [];

  constructor(
    private appService: AppService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initLinks();
    this.sub$.push(
      this.appService.isDarkMode$.subscribe((v) => (this.isDarkMode = v)),
      this.authService.user$.subscribe((user) => {
        this.user = user;
        this.initLinks();
      })
    );
  }

  initLinks() {
    this.links = [
      { title: 'Home', url: '/', isActive: true },
      { title: 'About', url: '/about', isActive: false },
      { title: 'Services', url: '/services', isActive: false },
      { title: 'Portfolio', url: '/portfolio', isActive: false },
      { title: 'Companies', url: '/companies', isActive: false },
      { title: 'Testimonials', url: '/testimonials', isActive: false },
      { title: 'Contact Me', url: '/contact-me', isActive: false },
      // { title: 'Privacy Policy', url: '/privacy-policy', isActive: true },
      {
        title: 'DB Companies',
        url: '/dashboard/companies',
        isActive: this.isAdmin(),
      },
      {
        title: 'DB Projects',
        url: '/dashboard/projects',
        isActive: this.isAdmin(),
      },
      { title: 'DB Users', url: '/dashboard/users', isActive: this.isAdmin() },
      {
        title: 'DB Testimonials',
        url: '/dashboard/testimonials',
        isActive: this.isAdmin(),
      },
      { title: 'DB Team', url: '/dashboard/team', isActive: this.isAdmin() },
    ];
  }

  onLogin() {
    this.authService.showOneTapGoogle();
  }

  signOut() {
    this.authService.signOut();
  }

  switchMode() {
    this.appService.switchMode();
  }

  isAdmin() {
    return this.user?.uid === environment.adminID;
  }

  ngOnDestroy() {
    this.sub$.forEach((subs) => subs.unsubscribe());
  }
}
