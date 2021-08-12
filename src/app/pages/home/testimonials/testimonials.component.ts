import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Modal } from 'bootstrap';
import { Carousel } from 'bootstrap';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { testimonial } from 'src/app/core/modals/add-testimonial/testimonial.model';
import { TestimonialsService } from 'src/app/services/testimonials.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tSlider') tSlider?: ElementRef<HTMLDivElement>;
  testimonials: testimonial[] = [];
  user: User | null = null;

  carouselSlider: any;

  private sub$: Subscription[] = [];

  constructor(
    public authService: AuthService,
    public testimonialsService: TestimonialsService
  ) {}

  ngOnInit(): void {
    this.sub$.push(
      this.authService.user$.subscribe((user) => (this.user = user)),
      this.getTestimonials()
    );
  }

  getTestimonials() {
    return this.testimonialsService.testimonials.subscribe((testi) => {
      this.testimonials = testi.filter(
        (t) =>
          t.approved ||
          t.uid === this.user?.uid ||
          this.user?.uid === environment.adminID
      );
      this.setCarousel();
    });
  }

  ngAfterViewInit() {
    this.setCarousel();
  }

  private setCarousel() {
    let el = this.tSlider?.nativeElement;
    if (el) this.carouselSlider = new Carousel(el, { interval: 0 });
  }

  saySomethingNice() {
    if (!this.user) this.authService.showOneTapGoogle();
    else {
      let modalEl = document.getElementById('testimonialModal');
      if (!modalEl) return;
      let myModal = new Modal(modalEl);
      myModal.show();
    }
  }

  ngOnDestroy() {
    this.sub$.forEach((subs) => subs.unsubscribe());
  }
}
