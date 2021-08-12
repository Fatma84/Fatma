import { User } from 'src/app/auth/user';

export interface team {
  tid?: string;
  uid: string;
  user?: User;
  position?: string;
  description: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  approved: boolean;
}
