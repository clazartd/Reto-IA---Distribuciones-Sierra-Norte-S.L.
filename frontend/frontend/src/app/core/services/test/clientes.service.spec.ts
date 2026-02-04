import { ClientesService } from '../clientes.service';
import { Cliente } from '../../models/cliente.model';
import { of, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

describe('ClientesService (vanilla mocks, async/await)', () => {
  let service: ClientesService;
  let called: { method: string, args: any[] }[];
  let http: any;
  const API = `${environment.apiUrl}/clientes`;

  beforeEach(() => {
    called = [];
    http = {
      get: (...args: any[]) => { called.push({ method: 'get', args }); return of(args[1] || []); },
      post: (...args: any[]) => { called.push({ method: 'post', args }); return of(args[1] || {}); },
      put: (...args: any[]) => { called.push({ method: 'put', args }); return of(args[1] || {}); }
    };
    service = new ClientesService(http);
    (service as any).baseUrl = API;
  });

  it('getClientes llama a GET y emite array', async () => {
    const mockClientes: Cliente[] = [{ id: '1', nombre: 'Ada', activo: true } as any];
    http.get = (...args: any[]) => { called.push({ method: 'get', args }); return of(mockClientes); };
    const clis = await firstValueFrom(service.getClientes());
    expect(called.some(call => call.method === 'get' && call.args[0] === API)).toBe(true);
    expect(clis).toEqual(mockClientes);
  });

  it('getClienteById llama GET por id', async () => {
    const cli = { id: 'a', nombre: 'Ada', activo: true } as any;
    http.get = (...args: any[]) => { called.push({ method: 'get', args }); return of(cli); };
    const c = await firstValueFrom(service.getClienteById('a'));
    expect(called.some(call => call.method === 'get' && call.args[0] === API + '/a')).toBe(true);
    expect(c).toEqual(cli);
  });

  it('createCliente hace POST y emite cliente', async () => {
    const cli = { nombre: 'nuevo' } as any;
    http.post = (...args: any[]) => { called.push({ method: 'post', args }); return of(cli); };
    const res = await firstValueFrom(service.createCliente(cli));
    expect(called.some(call => call.method === 'post' && call.args[0] === API && call.args[1] === cli)).toBe(true);
    expect(res).toEqual(cli);
  });

  it('updateCliente hace PUT a /id', async () => {
    const cli = { nombre: 'actualiza' } as any;
    http.put = (...args: any[]) => { called.push({ method: 'put', args }); return of(cli); };
    const res = await firstValueFrom(service.updateCliente('b', cli));
    expect(called.some(call => call.method === 'put' && call.args[0] === API + '/b' && call.args[1] === cli)).toBe(true);
    expect(res).toEqual(cli);
  });

  it('deactivateCliente hace PUT a /id/desactivar', async () => {
    const cli = { id: 'b', activo: false } as any;
    http.put = (...args: any[]) => { called.push({ method: 'put', args }); return of(cli); };
    const res = await firstValueFrom(service.deactivateCliente('b'));
    expect(called.some(call => call.method === 'put' && call.args[0] === API + '/b/desactivar' && call.args[1] && typeof call.args[1] === 'object')).toBe(true);
    expect(res).toEqual(cli);
  });
});
