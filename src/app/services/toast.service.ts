import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Toast } from '../core/toast/Toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = new BehaviorSubject<Toast[]>([]);

  constructor() {}

  addToast(toast: Toast) {
    this.toasts.pipe(take(1)).subscribe((toasts) => {
      let _toasts = toasts;
      _toasts.push(toast);
      this.toasts.next(_toasts);
      setTimeout(() => {
        this.removeFirstToast();
      }, 5000);
    });
  }

  removeFirstToast() {
    this.toasts.pipe(take(1)).subscribe((toasts) => {
      let _toasts = toasts;
      _toasts.shift();
      this.toasts.next(_toasts);
    });
  }
}
