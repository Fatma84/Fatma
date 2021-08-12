import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';

// Services
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { SplashScreenService } from './core/splash-screen/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub$: Subscription[] = [];
  showApp: boolean = false;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private splashScreenService: SplashScreenService
  ) {}

  ngOnInit(): void {
    this.appService.initWOW();
    this.initBootstrap();

    const routerSub$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
          document.body.classList.remove('page-loading');
          this.showApp = true;
        }, 1500);
      }
    });
    this.sub$.push(routerSub$);
  }

  initBootstrap() {
    let el: any;
    new Modal(el);
  }

  ngOnDestroy() {
    this.sub$.forEach((sb) => sb.unsubscribe());
  }
}
