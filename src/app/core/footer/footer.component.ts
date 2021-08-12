import { Component, OnInit } from '@angular/core';

interface socialMedia {
  title: string;
  url: string;
  icon: string;
  target: '_blank' | '_self';
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  socialMedia: socialMedia[] = [
    {
      title: 'facebook',
      icon: 'facebook',
      url: 'https://www.facebook.com/profile.php?id=100053868099609',
      target: '_blank',
    },
    {
      title: 'twitter',
      icon: 'twitter',
      url: 'https://twitter.com/OmarEls95211463',
      target: '_blank',
    },
    {
      title: 'linkedin',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/challengeromar/',
      target: '_blank',
    },
    {
      title: 'instagram',
      icon: 'instagram',
      url: 'https://www.instagram.com/foxfoxfoc/',
      target: '_blank',
    },
    {
      title: 'whatsapp',
      icon: 'whatsapp',
      url: 'https://wa.me/201557032911',
      target: '_blank',
    },
    {
      title: 'mail',
      icon: 'mail',
      url: 'mailto:challengeromar97@gmail.com',
      target: '_self',
    },
    {
      title: 'phone',
      icon: 'phone',
      url: 'tel:201557032911',
      target: '_self',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
