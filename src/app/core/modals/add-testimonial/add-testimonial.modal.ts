import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Services
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TestimonialsService } from 'src/app/services/testimonials.service';

// Interfaces & Classes
import { User } from 'src/app/auth/user';
import { Toast } from '../../toast/Toast.model';
import { testimonial } from './testimonial.model';

@Component({
  selector: 'modal-add-testimonial',
  templateUrl: './add-testimonial.modal.html',
  styleUrls: ['./add-testimonial.modal.scss'],
})
export class AddTestimonialModal implements OnInit {
  user: User | null = null;

  testimonialForm = this.fb.group({
    position: [''],
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

  get position() {
    return this.testimonialForm.get('position') as FormControl;
  }
  get message() {
    return this.testimonialForm.get('message') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private testimonialsService: TestimonialsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userSubs();
  }

  userSubs() {
    this.authService.user$.subscribe((user) => (this.user = user));
  }

  onSendForm() {
    if (this.testimonialForm.invalid) return;
    this.isSending = true;
    this.testimonialForm.disable();

    if (!this.user) return;

    let testimonialForm: testimonial = {
      uid: this.user.uid,
      position: this.position.value,
      message: this.message.value,
      approved: false,
    };

    this.testimonialsService.addTestimonial(testimonialForm).then(
      (res) => {
        let toast = new Toast(
          'message sent successfully',
          'Thank You, I just recieved your testimonial',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.resetForm();
        this.testimonialForm.enable();
      },
      (err) => {
        let toast = new Toast(
          'Error',
          'There is an error in sending your testimonial',
          2
        );
        this.toastService.addToast(toast);
        this.isSending = false;
        this.testimonialForm.enable();
      }
    );
  }

  private resetForm() {
    this.testimonialForm.reset({
      position: '',
      message: '',
    });
  }
}
