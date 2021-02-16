import { Header } from './models/header.model';
import { User } from './models/user.model';

export interface AppState {
  readonly headers: Header[];
  readonly users: User[];
  readonly user: User;
}
export const initializeState = (): AppState => {
  return { headers: null, users: null, user: null };
};
