import { SessionService } from '../session.service';
import { User } from '../../models/user.model';
import { Role } from '../../constants/roles.constants';

describe('SessionService (vanilla, localStorage mock)', () => {
  let service: SessionService;
  let storage: Record<string, string | null>;
  let localStorageBackup: any;

  const user: User = { id: '1', username: 'x', role: Role.ADMINISTRACION };

  beforeEach(() => {
    service = new SessionService();
    storage = {};
    // Backup real localStorage
    localStorageBackup = { ...window.localStorage };
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => key in storage ? storage[key] : null,
        setItem: (key: string, val: string) => { storage[key] = val; },
        removeItem: (key: string) => { storage[key] = null; }
      },
      configurable: true
    });
  });

  afterEach(() => {
    // Restore real localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageBackup,
      configurable: true
    });
  });

  it('setSession y getSession asignan al storage y retornan usuario', () => {
    service.setSession(user);
    expect(storage['sessionUser']).toBe(JSON.stringify(user));
    const result = service.getSession();
    expect(result).toEqual(user);
  });

  it('clearSession quita el usuario', () => {
    service.setSession(user);
    service.clearSession();
    expect(storage['sessionUser']).toBeNull();
    expect(service.getSession()).toBeNull();
  });

  it('isAuthenticated retorna true si hay usuario, false si no', () => {
    service.clearSession();
    expect(service.isAuthenticated()).toBe(false);
    service.setSession(user);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('getUserRole retorna el role o null', () => {
    service.clearSession();
    expect(service.getUserRole()).toBeNull();
    service.setSession(user);
    expect(service.getUserRole()).toBe(user.role);
  });

  it('getUser es igual a getSession', () => {
    service.setSession(user);
    expect(service.getUser()).toEqual(service.getSession());
  });
});
