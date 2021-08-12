import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormsService } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { ToastService } from 'src/app/services/toast.service';
import { Toast } from 'src/app/core/toast/Toast.model';
import { ConversationForm } from './conversation.interface';

@Component({
  selector: 'modal-conversation',
  templateUrl: './conversation.modal.html',
  styleUrls: ['./conversation.modal.scss'],
})
export class ConversationModal implements OnInit {
  user: User | null = null;

  conversationForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    project: ['', [Validators.required]],
    details: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
      ],
    ],
  });

  isSending: boolean = false;

  get name() {
    return this.conversationForm.get('name') as FormControl;
  }
  get email() {
    return this.conversationForm.get('email') as FormControl;
  }
  get phone() {
    return this.conversationForm.get('phone') as FormControl;
  }
  get project() {
    return this.conversationForm.get('project') as FormControl;
  }
  get details() {
    return this.conversationForm.get('details') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private formsService: FormsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userSubs();
  }

  userSubs() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.conversationForm.patchValue({
          name: user.displayName,
          email: user.email,
        });
      } else this.conversationForm.reset({});
    });
  }

  onSendForm() {
    if (this.conversationForm.invalid) return;
    this.isSending = true;
    this.conversationForm.disable();

    let conversationForm: ConversationForm = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      project: this.project.value,
      details: this.details.value,
    };
    if (this.user) {
      conversationForm.uid = this.user.uid;
      conversationForm.name = this.user.displayName;
      conversationForm.email = this.user.email;
    }

    this.formsService.sendConversationForm(conversationForm).then(
      (res) => {
        let toast = new Toast(
          'message sent successfully',
          'Thank You, I just recieved your message',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.resetForm();
        this.conversationForm.enable();
      },
      (err) => {
        let toast = new Toast(
          'Error',
          'There is an error in sending your message',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.conversationForm.enable();
      }
    );
  }

  private resetForm() {
    if (!this.user) this.conversationForm.reset();
    else
      this.conversationForm.reset({
        name: this.name.value,
        email: this.email.value,
      });
  }
}
