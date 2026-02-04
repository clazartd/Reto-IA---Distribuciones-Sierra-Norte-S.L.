import { ProductosService } from '../productos.service';
import { Producto } from '../../models/producto.model';
import { of, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

describe('ProductosService (vanilla mocks, async/await)', () => {
  let service: ProductosService;
  let called: { method: string, args: any[] }[];
  let http: any;
  const API = `${environment.apiUrl}/productos`;

  beforeEach(() => {
    called = [];
    http = {
      get: (...args: any[]) => { called.push({ method: 'get', args }); return of(args[1] || []); },
      post: (...args: any[]) => { called.push({ method: 'post', args }); return of(args[1] || {}); },
      put: (...args: any[]) => { called.push({ method: 'put', args }); return of(args[1] || {}); },
      delete: (...args: any[]) => { called.push({ method: 'delete', args }); return of({ deleted: true }); }
    };
    service = new ProductosService(http);
    (service as any).apiUrl = API;
  });

  it('getProductos llama a GET y emite array', async () => {
    const productos: Producto[] = [{ id: 'p1', nombre: 'prod', precioReferencia: 10 } as any];
    http.get = (...args: any[]) => { called.push({ method: 'get', args }); return of(productos); };
    const res = await firstValueFrom(service.getProductos());
    expect(called.some(call => call.method === 'get' && call.args[0] === API)).toBe(true);
    expect(res).toEqual(productos);
  });

  it('getProductoById llama GET por id', async () => {
    const prod = { id: 'a', nombre: 'uno', precioReferencia: 20 } as any;
    http.get = (...args: any[]) => { called.push({ method: 'get', args }); return of(prod); };
    const res = await firstValueFrom(service.getProductoById('a'));
    expect(called.some(call => call.method === 'get' && call.args[0] === API + '/a')).toBe(true);
    expect(res).toEqual(prod);
  });

  it('createProducto hace POST y emite producto', async () => {
    const prod = { nombre: 'nuevo', precioReferencia: 99 } as any;
    http.post = (...args: any[]) => { called.push({ method: 'post', args }); return of(prod); };
    const res = await firstValueFrom(service.createProducto(prod));
    expect(called.some(call => call.method === 'post' && call.args[0] === API && call.args[1] === prod)).toBe(true);
    expect(res).toEqual(prod);
  });

  it('updateProducto hace PUT a /id', async () => {
    const prod = { nombre: 'actualiza', precioReferencia: 55 } as any;
    http.put = (...args: any[]) => { called.push({ method: 'put', args }); return of(prod); };
    const res = await firstValueFrom(service.updateProducto('u', prod));
    expect(called.some(call => call.method === 'put' && call.args[0] === API + '/u' && call.args[1] === prod)).toBe(true);
    expect(res).toEqual(prod);
  });

  it('deleteProducto hace DELETE a /id', async () => {
    http.delete = (...args: any[]) => { called.push({ method: 'delete', args }); return of({ deleted: true }); };
    const res = await firstValueFrom(service.deleteProducto('x'));
    expect(called.some(call => call.method === 'delete' && call.args[0] === API + '/x')).toBe(true);
    expect(res).toEqual({ deleted: true });
  });
});
