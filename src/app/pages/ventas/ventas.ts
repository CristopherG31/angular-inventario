import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../core/services/producto';
import { VentaService } from '../../core/services/venta';

@Component({
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.scss'
})
export class Ventas implements OnInit, OnDestroy {

  private productoService = inject(ProductoService);
  private ventaService = inject(VentaService);

  productos: any[] = [];
  carrito: any[] = [];

  cliente = '';
  metodo_pago = 'efectivo';

  total = 0;

  // 🔥 REFRESH (nivel 2)
  private onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      this.cargarProductos();
    }
  };

  ngOnInit(): void {
    this.cargarProductos();
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

  // 📦 PRODUCTOS
  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (res: any) => {
        this.productos = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  // ➕ AGREGAR AL CARRITO
  agregar(producto: any) {

    const index = this.carrito.findIndex(
      (p) => p.producto_id === producto.id
    );

    const cantidadEnCarrito =
      index !== -1 ? this.carrito[index].cantidad : 0;

    if (cantidadEnCarrito >= producto.stock) {
      alert('No hay más stock 😅');
      return;
    }

    if (index !== -1) {

      this.carrito[index] = {
        ...this.carrito[index],
        cantidad: this.carrito[index].cantidad + 1
      };

    } else {

      this.carrito.push({
        producto_id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio_venta,
        cantidad: 1
      });
    }

    this.carrito = [...this.carrito]; // 🔥 fuerza actualización
    this.calcularTotal();
  }

  // ➖ DISMINUIR
  disminuir(producto: any) {

    const index = this.carrito.findIndex(
      (p) => p.producto_id === producto.producto_id
    );

    if (index === -1) return;

    const item = this.carrito[index];

    const nuevaCantidad = item.cantidad - 1;

    if (nuevaCantidad <= 0) {
      this.carrito.splice(index, 1);
    } else {
      this.carrito[index] = {
        ...item,
        cantidad: nuevaCantidad
      };
    }

    this.carrito = [...this.carrito]; // 🔥 fuerza actualización
    this.calcularTotal();
  }

  // ❌ QUITAR
  quitar(index: number) {
    this.carrito.splice(index, 1);
    this.carrito = [...this.carrito];
    this.calcularTotal();
  }

  // 💰 TOTAL (CLAVE)
  calcularTotal() {
    this.total = this.carrito.reduce(
      (sum, item) => sum + (item.precio * item.cantidad),
      0
    );
  }

  // 🧾 VENTA
  vender() {

    const data = {
      user_id: 1,
      cliente: this.cliente,
      metodo_pago: this.metodo_pago,
      productos: this.carrito.map(p => ({
        producto_id: p.producto_id,
        cantidad: p.cantidad
      }))
    };

    this.ventaService.crearVenta(data)
      .subscribe({
        next: () => {

          alert('Venta realizada 😎');

          this.carrito = [];
          this.total = 0;
          this.cliente = '';

          this.cargarProductos();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }
}