import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools-svg',
  templateUrl: './tools-svg.component.html',
  styleUrls: ['./tools-svg.component.scss'],
})
export class ToolsSvgComponent implements OnInit {
  @Input() bg = '#ffffff';
  constructor() {}

  ngOnInit(): void {}
}
