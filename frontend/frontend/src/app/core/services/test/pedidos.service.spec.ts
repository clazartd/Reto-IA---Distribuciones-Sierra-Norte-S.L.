import { PedidosService } from '../pedidos.service';
import { Pedido, Estado } from '../../models/pedido.model';
import { of, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

describe('PedidosService (vanilla mocks, async/await)', () => {
  let service: PedidosService;
  let called: { method: string, args: any[] }[];
  let http: any;
  const API = `${environment.apiUrl}/pedidos`;

  beforeEach(() => {
    called = [];
    http = {
      get: (...args: any[]) => { called.push({ method: 'get', args }); return of(args[1] || []); },
      post: (...args: any[]) => { called.push({ method: 'post', args }); return of(args[1] || {}); },
      put: (...args: any[]) => { called.push({ method: 'put', args }); return of(args[1] || {}); }
    };
    service = new PedidosService(http);
    (service as any).apiUrl = API;
  });

  it('getPedidos llama a GET sin filtros', async () => {
    const mockPedidos: Pedido[] = [{ id: '1', clienteId: 'A', estado: Estado.PREPARACION } as any];
    http.get = (...args: any[]) => { called.push({ method: 'get', args }); return of(mockPedidos); };
    const pedidos = await firstValueFrom(service.getPedidos());
    expect(called.some(call => call.method === 'get' && call.args[0] === API)).toBe(true);
    expect(pedidos).toEqual(mockPedidos);
  });

  it('getPedidos llama a GET con filtros estado y clienteId', async () => {
    const mockPedidos: Pedido[] = [{ id: '2', clienteId: 'B', estado: Estado.REGISTRADO } as any];
    let capturedParams: any;
    http.get = (...args: any[]) => { called.push({ method: 'get', args }); capturedParams = args[1]?.params; return of(mockPedidos); };
    const pedidos = await firstValueFrom(service.getPedidos({ estado: Estado.REGISTRADO, clienteId: 'B' }));
    expect(capturedParams).toBeDefined();
    expect(capturedParams.get('estado')).toBe(Estado.REGISTRADO);
    expect(capturedParams.get('clienteId')).toBe('B');
    expect(pedidos).toEqual(mockPedidos);
  });

  it('getPedidoById llama GET por id', async () => {
    const pedido = { id: 'a', clienteId: 'C', estado: Estado.REPARTO } as any;
    http.get = (...args: any[]) => { called.push({ method: 'get', args }); return of(pedido); };
    const p = await firstValueFrom(service.getPedidoById('a'));
    expect(called.some(call => call.method === 'get' && call.args[0] === API + '/a')).toBe(true);
    expect(p).toEqual(pedido);
  });

  it('createPedido hace POST con cuerpo y emite pedido', async () => {
    const pedido = { clienteId: 'Z', estado: Estado.REGISTRADO } as any;
    http.post = (...args: any[]) => { called.push({ method: 'post', args }); return of(pedido); };
    const res = await firstValueFrom(service.createPedido(pedido));
    expect(called.some(call => call.method === 'post' && call.args[0] === API && call.args[1] === pedido)).toBe(true);
    expect(res).toEqual(pedido);
  });

  it('updatePedido hace PUT a /id con cuerpo', async () => {
    const pedido = { clienteId: 'U', estado: Estado.REPARTO } as any;
    http.put = (...args: any[]) => { called.push({ method: 'put', args }); return of(pedido); };
    const res = await firstValueFrom(service.updatePedido('b', pedido));
    expect(called.some(call => call.method === 'put' && call.args[0] === API + '/b' && call.args[1] === pedido)).toBe(true);
    expect(res).toEqual(pedido);
  });

  it('cancelPedido hace PUT a /id/cancelar con motivo', async () => {
    const pedido = { id: 'x', estado: Estado.CANCELADO } as any;
    http.put = (...args: any[]) => { called.push({ method: 'put', args }); return of(pedido); };
    const res = await firstValueFrom(service.cancelPedido('x', 'test'));
    expect(called.some(call => call.method === 'put' && call.args[0] === API + '/x/cancelar' && call.args[1] && call.args[1].motivo === 'test')).toBe(true);
    expect(res).toEqual(pedido);
  });
});
