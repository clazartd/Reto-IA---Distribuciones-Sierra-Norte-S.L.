import { Role } from '../constants/roles.constants';

export interface User {
  id: string;
  username: string;
  role: Role;
  nombre?: string;
  // otros campos opcionales
}
