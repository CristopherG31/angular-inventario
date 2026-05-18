import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../core/services/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class ProductosComponent implements OnInit {

  private productoService = inject(ProductoService);

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

  // ======================
  // CARGAR PRODUCTOS
  // ======================
  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (response: any) => {
        console.log('PRODUCTOS API:', response);
        this.productos = response;
      },
      error: (error) => {
        console.error('ERROR GET PRODUCTOS:', error);
      }
    });
  }

  // ======================
  // GUARDAR (CREAR / EDITAR)
  // ======================
  guardarProducto() {
    this.modoEdicion
      ? this.actualizarProducto()
      : this.crearProducto();
  }

  // ======================
  // CREAR
  // ======================
  crearProducto() {
    this.productoService.crearProducto(this.nuevoProducto).subscribe({
      next: () => {
        alert('Producto creado 😎');
        this.cargarProductos();
        this.limpiarFormulario();
      },
      error: (error) => {
        console.error('ERROR CREATE:', error);
      }
    });
  }

  // ======================
  // EDITAR
  // ======================
  editarProducto(producto: any) {
    this.modoEdicion = true;
    this.productoId = producto.id;

    this.nuevoProducto = {
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria_id: producto.categoria_id,
      precio_compra: producto.precio_compra,
      precio_venta: producto.precio_venta,
      stock: producto.stock,
      stock_minimo: producto.stock_minimo,
      estado: producto.estado
    };
  }

  // ======================
  // ACTUALIZAR
  // ======================
  actualizarProducto() {
    if (!this.productoId) return;

    this.productoService
      .actualizarProducto(this.productoId, this.nuevoProducto)
      .subscribe({
        next: () => {
          alert('Producto actualizado 😎');
          this.cargarProductos();
          this.modoEdicion = false;
          this.productoId = null;
          this.limpiarFormulario();
        },
        error: (error) => {
          console.error('ERROR UPDATE:', error);
        }
      });
  }

  // ======================
  // ELIMINAR
  // ======================
  eliminarProducto(id: number) {
    if (!confirm('¿Eliminar producto?')) return;

    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        alert('Producto eliminado 😎');
        this.cargarProductos();
      },
      error: (error) => {
        console.error('ERROR DELETE:', error);
      }
    });
  }

  // ======================
  // LIMPIAR FORM
  // ======================
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