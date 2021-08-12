import { User } from 'src/app/auth/user';

export interface testimonial {
  tid?: string;
  uid: string;
  user?: User;
  position?: string;
  message: string;
  approved: boolean;
}
