import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Services
import { FormsService } from 'src/app/services/forms.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/auth/auth.service';

// Interfaces & Classes
import { User } from 'src/app/auth/user';
import { Toast } from 'src/app/core/toast/Toast.model';
import { SayHelloForm } from './sayHelloForm.interface';

@Component({
  selector: 'modal-say-hello',
  templateUrl: './say-hello.modal.html',
  styleUrls: ['./say-hello.modal.scss'],
})
export class SayHelloModal implements OnInit {
  user: User | null = null;

  sayHelloForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    message: [
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
    return this.sayHelloForm.get('name') as FormControl;
  }
  get email() {
    return this.sayHelloForm.get('email') as FormControl;
  }
  get phone() {
    return this.sayHelloForm.get('phone') as FormControl;
  }
  get message() {
    return this.sayHelloForm.get('message') as FormControl;
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
        this.sayHelloForm.patchValue({
          name: user.displayName,
          email: user.email,
        });
      } else this.sayHelloForm.reset({});
    });
  }

  onSendForm() {
    if (this.sayHelloForm.invalid) return;
    this.isSending = true;
    this.sayHelloForm.disable();

    let sayHelloForm: SayHelloForm = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      message: this.message.value,
    };
    if (this.user) {
      sayHelloForm.uid = this.user.uid;
      sayHelloForm.name = this.user.displayName;
      sayHelloForm.email = this.user.email;
    }

    this.formsService.sendSayHelloForm(sayHelloForm).then(
      (res) => {
        let toast = new Toast(
          'message sent successfully',
          'Thank You, I just recieved your message',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.resetForm();
        this.sayHelloForm.enable();
      },
      (err) => {
        let toast = new Toast(
          'Error',
          'There is an error in sending your message',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.sayHelloForm.enable();
      }
    );
  }

  private resetForm() {
    if (!this.user) this.sayHelloForm.reset();
    else
      this.sayHelloForm.reset({
        name: this.name.value,
        email: this.email.value,
      });
  }
}
