import { framework } from '../pages/dashboard/projects/projects.interface';

export const FRAMEWORKS: { [key: string]: framework } = {
  wordpress: {
    title: 'Wordpress',
    icon: 'wordpress',
    innerHTML: '',
  },
  woocommerce: {
    title: 'Woocommerce',
    icon: 'woocommerce',
    innerHTML: '<span class="path1"></span><span class="path2"></span>',
  },
  laravel: {
    title: 'Laravel',
    icon: 'laravel',
    innerHTML: '',
  },
  angular: {
    title: 'Angular',
    icon: 'angular',
    innerHTML:
      '<span class="path1"></span><span class="path2"></span><span class="path3"></span>',
  },
  ionic: {
    title: 'Ionic',
    icon: 'ionic',
    innerHTML: '',
  },
  nodejs: {
    title: 'Nodejs',
    icon: 'nodejs',
    innerHTML:
      '<span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span>',
  },
  php: {
    title: 'PHP',
    icon: 'php',
    innerHTML:
      '<span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>',
  },
  pwa: {
    title: 'PWA',
    icon: 'pwa',
    innerHTML:
      '<span class="path1"></span><span class="path2"></span><span class="path3"></span>',
  },
};
