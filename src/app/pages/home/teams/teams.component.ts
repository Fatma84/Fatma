import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

// Modules
import { Carousel, Modal } from 'bootstrap';

// Services
import { AuthService } from 'src/app/auth/auth.service';
import { TeamService } from 'src/app/services/team.service';

// Models & Interfaces
import { User } from 'src/app/auth/user';
import { team } from 'src/app/core/modals/join-team/team.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  team: team[] = [];
  user: User | null = null;

  carouselSlider: any;

  private sub$: Subscription[] = [];

  constructor(
    public authService: AuthService,
    public teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.sub$.push(
      this.authService.user$.subscribe((user) => (this.user = user)),
      this.getTeam()
    );
  }

  getTeam() {
    return this.teamService.team.subscribe((team) => {
      this.team = team.filter(
        (t) =>
          t.approved ||
          t.uid === this.user?.uid ||
          this.user?.uid === environment.adminID
      );
    });
  }

  joinTheTeam() {
    if (!this.user) this.authService.showOneTapGoogle();
    else {
      let modalEl = document.getElementById('teamModal');
      if (!modalEl) return;
      let myModal = new Modal(modalEl);
      myModal.show();
    }
  }

  ngOnDestroy() {
    this.sub$.forEach((subs) => subs.unsubscribe());
  }
}
