import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

declare var WOW: any;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  isDarkMode$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.getMode();
  }

  getMode() {
    const savedMode = localStorage.getItem('mode');
    let defaultMode: 'dark-mode' | 'light-mode' =
      savedMode == 'dark-mode' ? 'dark-mode' : 'light-mode';
    this.isDarkMode$.next(defaultMode == 'dark-mode');
    this.setMode(defaultMode);
  }

  switchMode() {
    this.isDarkMode$.pipe(take(1)).subscribe((isDarkMode) => {
      this.isDarkMode$.next(!isDarkMode);
      const mode = isDarkMode ? 'light-mode' : 'dark-mode';
      this.setMode(mode);
    });
  }

  setMode(mode: 'dark-mode' | 'light-mode') {
    const bodyClass = document.body.classList;
    localStorage.setItem('mode', mode);
    bodyClass.remove('dark-mode', 'light-mode');
    bodyClass.add(mode);
  }

  initWOW() {
    var wow = new WOW({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box: any) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null, // optional scroll container selector, otherwise use window,
      resetAnimation: true, // reset animation on end (default is true)
    });
    wow.init();
  }
}
