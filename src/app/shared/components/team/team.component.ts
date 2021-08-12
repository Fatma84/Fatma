import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { team } from 'src/app/core/modals/join-team/team.model';
import { Toast } from 'src/app/core/toast/Toast.model';
import { TeamService } from 'src/app/services/team.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input() team: team[] = [];
  isDeleting?: string;
  readonly adminID = environment.adminID;

  constructor(
    private teamService: TeamService,
    public authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  togglePerson(tid: string, isApproved: boolean) {
    this.teamService.togglePerson(tid, isApproved);
  }

  deletePerson(tid: string) {
    if (this.isDeleting) return;
    this.isDeleting = tid;
    this.teamService
      .deletePerson(tid)
      .then((res) => {
        this.isDeleting = undefined;
        let toast = new Toast(
          'person deleted',
          'Person deleted successfully',
          2
        );
        this.toastService.addToast(toast);
      })
      .catch((err) => {
        let toast = new Toast(
          'error in deleting',
          'error in deleting person',
          2
        );
        this.toastService.addToast(toast);
        this.isDeleting = undefined;
      });
  }
}
