import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  bg = '#fff';
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.isDarkMode$.subscribe(
      (value) => (this.bg = !!value ? '#12181B' : '#fff')
    );
  }
}
