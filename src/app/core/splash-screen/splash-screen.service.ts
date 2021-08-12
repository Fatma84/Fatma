import { animate, AnimationBuilder, style } from '@angular/animations';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private el?: ElementRef;
  private stopped?: boolean;

  constructor(private animationBuilder: AnimationBuilder) {}

  /**
   * Init
   * @param element: ElementRef
   */
  init(element: ElementRef) {
    this.el = element;
  }

  // Hide splash screen
  hide() {
    if (this.stopped || !this.el) return;

    const player = this.animationBuilder
      .build([style({ opacity: '1' }), animate(1500, style({ opacity: '0' }))])
      .create(this.el.nativeElement);

    player.onDone(() => {
      if (!this.el) return;
      if (typeof this.el.nativeElement.remove === 'function')
        this.el.nativeElement.remove();
      else this.el.nativeElement.style.display = 'none !important';
      this.stopped = true;
    });

    setTimeout(() => player.play(), 100);
  }
}
