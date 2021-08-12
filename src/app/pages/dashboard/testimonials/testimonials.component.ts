import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { testimonial } from 'src/app/core/modals/add-testimonial/testimonial.model';
import { TestimonialsService } from 'src/app/services/testimonials.service';

@Component({
  selector: 'dashboard-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class DBTestimonialsComponent implements OnInit {
  testimonials: testimonial[] = [];

  private sub$: Subscription[] = [];

  constructor(private testimonialsService: TestimonialsService) {}

  ngOnInit(): void {
    this.sub$.push(this.getTestimonials());
  }

  getTestimonials() {
    return this.testimonialsService.testimonials.subscribe(
      (t) => (this.testimonials = t)
    );
  }

  toggleTestimonial(tid: string, isApproved: boolean) {
    this.testimonialsService.toggleTestimonial(tid, isApproved);
  }

  deleteTestimonial(tid: string) {
    this.testimonialsService.deleteTestimonial(tid);
  }

  ngOnDestroy() {
    this.sub$.forEach((subs) => subs.unsubscribe());
  }
}
