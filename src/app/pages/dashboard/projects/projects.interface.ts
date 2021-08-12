export interface framework {
  title: string;
  icon: string;
  innerHTML: string;
}

export interface project {
  priority: number;
  title: string;
  logoURL: string;
  date: Date;
  link?: string;
  description: string;
  status: 'production' | 'development' | 'upcoming' | 'shutdown';
  frameworks: string[];
}
