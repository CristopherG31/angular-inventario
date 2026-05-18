import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService }
from '../../core/services/producto';

@Component({
  selector: 'app-productos',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos
implements OnInit {

  private productoService =
    inject(ProductoService);

  productos: any[] = [];

  modoEdicion = false;
  productoId: number | null = null;

  nuevoProducto = {
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria_id: 1,
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
    stock_minimo: 0,
    estado: true
  };

  ngOnInit(): void {
    this.cargarProductos();
  }

  // Cargar productos
  cargarProductos() {

    this.productoService
      .getProductos()
      .subscribe({

        next: (
          response: any
        ) => {

          console.log(
            'PRODUCTOS API',
            response
          );

          this.productos =
            response;
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  // Decide si crear o editar
  guardarProducto() {

    if (
      this.modoEdicion
    ) {

      this.actualizarProducto();

    } else {

      this.crearProducto();
    }
  }

  // Crear producto
  crearProducto() {

    this.productoService
      .crearProducto(
        this.nuevoProducto
      )
      .subscribe({

        next: () => {

          alert(
            'Producto creado 😎'
          );

          this.cargarProductos();

          this.limpiarFormulario();
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  // Editar producto
  editarProducto(
    producto: any
  ) {

    this.modoEdicion =
      true;

    this.productoId =
      producto.id;

    this.nuevoProducto = {

      codigo:
        producto.codigo,

      nombre:
        producto.nombre,

      descripcion:
        producto.descripcion,

      categoria_id:
        producto.categoria_id,

      precio_compra:
        producto.precio_compra,

      precio_venta:
        producto.precio_venta,

      stock:
        producto.stock,

      stock_minimo:
        producto.stock_minimo,

      estado:
        producto.estado
    };
  }

  // Actualizar producto
  actualizarProducto() {

    this.productoService
      .actualizarProducto(
        this.productoId!,
        this.nuevoProducto
      )
      .subscribe({

        next: () => {

          alert(
            'Producto actualizado 😎'
          );

          this.cargarProductos();

          this.modoEdicion =
            false;

          this.productoId =
            null;

          this.limpiarFormulario();
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  // Eliminar producto
  eliminarProducto(
    id: number
  ) {

    const confirmar =
      confirm(
        '¿Eliminar producto?'
      );

    if (
      !confirmar
    ) return;

    this.productoService
      .eliminarProducto(id)
      .subscribe({

        next: () => {

          alert(
            'Producto eliminado 😎'
          );

          this.cargarProductos();
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  // Limpiar formulario
  limpiarFormulario() {

    this.nuevoProducto = {
      codigo: '',
      nombre: '',
      descripcion: '',
      categoria_id: 1,
      precio_compra: 0,
      precio_venta: 0,
      stock: 0,
      stock_minimo: 0,
      estado: true
    };
  }
}