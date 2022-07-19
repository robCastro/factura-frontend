import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos$!: Observable<Producto[]>;

  editarPrecio = false;
  
  editarDatos = false;

  crearNuevo = false;

  productoSeleccionado?: Producto;

  constructor(
    private productoService: ProductosService,
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  nuevo() {
    this.productoSeleccionado = { name: '', description: '', precio: 0 };
    this.crearNuevo = true;
  }

  crear() {
    this.productoService.crear(this.productoSeleccionado!).subscribe(() => {
      this.crearNuevo = false;
      this.cargarProductos();
    })
  }

  mostrarEditarPrecio(producto: Producto) {
    this.editarPrecio = true;
    this.productoSeleccionado = producto;
  }

  mostrarEditarDatos(producto: Producto) {
    this.editarDatos = true;
    this.productoSeleccionado = producto;
  }

  private cargarProductos() {
    this.productos$ = this.productoService.findAll();
  }

  actualizarPrecio() {
    this.productoService.updatePrecio(this.productoSeleccionado!).subscribe((res) => {
      this.editarPrecio = false;
      this.cargarProductos();
    })
  }

  actualizarDatos() {
    this.productoService.updateDatos(this.productoSeleccionado!).subscribe((res) => {
      this.editarDatos = false;
      this.cargarProductos();
    })
  }

}
