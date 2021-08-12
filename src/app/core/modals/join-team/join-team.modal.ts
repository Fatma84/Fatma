import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Services
import { AuthService } from 'src/app/auth/auth.service';
import { TeamService } from 'src/app/services/team.service';
import { ToastService } from 'src/app/services/toast.service';

// Models & Interfaces
import { User } from 'src/app/auth/user';
import { Toast } from '../../toast/Toast.model';
import { team } from './team.model';

@Component({
  selector: 'modal-join-team',
  templateUrl: './join-team.modal.html',
  styleUrls: ['./join-team.modal.scss'],
})
export class JoinTeamComponent implements OnInit {
  user: User | null = null;

  teamForm = this.fb.group({
    position: [''],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
      ],
    ],
    facebook: [''],
    instagram: [''],
    twitter: [''],
    linkedin: [''],
  });

  isSending: boolean = false;

  get position() {
    return this.teamForm.get('position') as FormControl;
  }
  get description() {
    return this.teamForm.get('description') as FormControl;
  }
  get facebook() {
    return this.teamForm.get('facebook') as FormControl;
  }
  get instagram() {
    return this.teamForm.get('instagram') as FormControl;
  }
  get twitter() {
    return this.teamForm.get('twitter') as FormControl;
  }
  get linkedin() {
    return this.teamForm.get('linkedin') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private teamService: TeamService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userSubs();
  }

  userSubs() {
    this.authService.user$.subscribe((user) => (this.user = user));
  }

  onSendForm() {
    if (this.teamForm.invalid) return;
    this.isSending = true;
    this.teamForm.disable();

    if (!this.user) return;

    let teamForm: team = {
      uid: this.user.uid,
      position: this.position.value,
      description: this.description.value,
      social: {
        facebook: this.facebook.value,
        instagram: this.instagram.value,
        twitter: this.twitter.value,
        linkedin: this.linkedin.value,
      },
      approved: false,
    };

    this.teamService.addTeam(teamForm).then(
      (res) => {
        let toast = new Toast(
          'message sent successfully',
          'Thank You, I just recieved your team',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.resetForm();
        this.teamForm.enable();
      },
      (err) => {
        let toast = new Toast(
          'Error',
          'There is an error in sending your team',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.teamForm.enable();
      }
    );
  }

  private resetForm() {
    this.teamForm.reset({
      position: '',
      description: '',
    });
  }
}
