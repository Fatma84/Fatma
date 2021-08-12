import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { team } from 'src/app/core/modals/join-team/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'db-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class DBTeamComponent implements OnInit, OnDestroy {
  team: team[] = [];

  private sub$: Subscription[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.sub$.push(this.getTeam());
  }
  getTeam() {
    return this.teamService.team.subscribe((t) => (this.team = t));
  }
  ngOnDestroy() {
    this.sub$.forEach((subs) => subs.unsubscribe());
  }
}
