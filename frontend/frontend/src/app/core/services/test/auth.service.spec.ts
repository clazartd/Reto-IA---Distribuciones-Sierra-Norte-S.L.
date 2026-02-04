import { AuthService } from '../auth.service';
import { of, throwError, firstValueFrom } from 'rxjs';
import { User } from '../../models/user.model';
import { Role } from '../../constants/roles.constants';

describe('AuthService (vanilla mocks, async/await)', () => {
  let service: AuthService;
  let http: any;
  let session: any;

  beforeEach(() => {
    http = { post: () => {} };
    session = {
      clearSession: () => {},
      isAuthenticated: () => false
    };
    service = new AuthService(session, http);
  });

  describe('login', () => {
    it('devuelve usuario cuando login OK', async () => {
      const user = { id: '1', username: 'test', role: Role.ADMINISTRACION } as User;
      http.post = () => of({ user });
      const result = await firstValueFrom(service.login({ username: 'x', password: 'y' }));
      expect(result).toEqual(user);
    });

    it('devuelve null si login retorna user null', async () => {
      http.post = () => of({ user: null });
      const result = await firstValueFrom(service.login({ username: 'a', password: 'b' }));
      expect(result).toBeNull();
    });

    it('devuelve null si hay error en login', async () => {
      http.post = () => throwError(() => new Error('fail'));
      const result = await firstValueFrom(service.login({ username: 'z', password: 'q' }));
      expect(result).toBeNull();
    });
  });

  describe('register', () => {
    it('devuelve user cuando registro OK', async () => {
      const user = { id: '5', username: 'u', role: Role.DIRECCION } as User;
      http.post = () => of({ user });
      const result = await firstValueFrom(service.register({ username: 'u', password: 'x', role: Role.DIRECCION }));
      expect(result).toEqual(user);
    });

    it('devuelve null si registro retorna null', async () => {
      http.post = () => of({ user: null });
      const result = await firstValueFrom(service.register({ username: 'x', password: 'z', role: Role.ADMINISTRACION }));
      expect(result).toBeNull();
    });

    it('maneja error al registrar', async () => {
      http.post = () => throwError(() => new Error('fail'));
      const result = await firstValueFrom(service.register({ username: 'bad', password: 'bad', role: Role.ADMINISTRACION }));
      expect(result).toBeNull();
    });
  });

  it('logout debe llamar a sessionService.clearSession', () => {
    let called = false;
    session.clearSession = () => { called = true; };
    service = new AuthService(session, http);
    service.logout();
    expect(called).toBe(true);
  });

  it('isAuthenticated refleja valor de sessionService', () => {
    session.isAuthenticated = () => true;
    service = new AuthService(session, http);
    expect(service.isAuthenticated()).toBe(true);
    session.isAuthenticated = () => false;
    service = new AuthService(session, http);
    expect(service.isAuthenticated()).toBe(false);
  });
});
