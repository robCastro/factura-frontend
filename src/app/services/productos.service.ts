import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private readonly PREFIJO_URL = environment.backend + 'api/v1/productos/'

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Producto[]>(this.PREFIJO_URL).pipe(
      tap(res => console.log('Res recibida', res)),
    )
  }

  crear(producto: Producto) {
    return this.httpClient.post<Producto>(this.PREFIJO_URL, producto).pipe(
      tap(res => console.log('Res recibida crear producto', res)),
    )
  }

  updatePrecio(producto: Producto) {
    const url = this.PREFIJO_URL + `${producto.id}/price/`
    return this.httpClient.put<Producto>(url, producto).pipe(
      tap(res => console.log('Res de update precio', res))
    )
  }

  updateDatos(producto: Producto) {
    const url = this.PREFIJO_URL + `${producto.id}/`
    return this.httpClient.put<Producto>(url, producto).pipe(
      tap(res => console.log('Res de update datos', res))
    )
  }
}
